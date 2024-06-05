const mysql = require('mysql2/promise');

async function transferTableData(sourceConnection, targetConnection, sourceTable, targetTable, batchSize) {
    // Get column names from the source table
    const [columnsRows] = await sourceConnection.query(`SHOW COLUMNS FROM ${sourceTable}`);
    const columns = columnsRows.map(col => col.Field);
    const columnsList = columns.join(', ');

    let offset = 0;
    let rows;

    do {
        // Fetch data from the source table in batches
        [rows] = await sourceConnection.query(`SELECT * FROM ${sourceTable} LIMIT ${batchSize} OFFSET ${offset}`);
        offset += batchSize;

        if (rows.length > 0) {
            // Build bulk insert values
            const values = rows.map(row => columns.map(col => row[col]));
            const placeholders = rows.map(() => `(${columns.map(() => '?').join(', ')})`).join(', ');

            const insertQuery = `INSERT INTO ${targetTable} (${columnsList}) VALUES ${placeholders}`;

            // Use a transaction to insert the batch of rows
            await targetConnection.beginTransaction();
            try {
                await targetConnection.query(insertQuery, [].concat(...values));
                await targetConnection.commit();
            } catch (err) {
                await targetConnection.rollback();
                throw err;
            }
        }
    } while (rows.length === batchSize);
}

async function transferData(batchSize = 100000, parallelism = 3) {
    // Configure the source and target database connections
    const sourceConfig = {
        host: 'localhost',
        port: 53306,
        user: 'perin',
        password: '',
        database: 'perin_oracle',
        connectionLimit: 20, // Use connection pooling
    };

    const targetConfig = {
        host: 'localhost',
        port: 53306,
        user: 'perin',
        password: '',
        database: 'perin',
        connectionLimit: 20, // Use connection pooling
    };

    let sourcePool, targetPool;

    try {
        // Create connection pools
        sourcePool = mysql.createPool(sourceConfig);
        targetPool = mysql.createPool(targetConfig);

        const sourceConnection = await sourcePool.getConnection();
        const targetConnection = await targetPool.getConnection();

        // Set global variables max_allowed_packet and net_buffer_length
        await sourceConnection.query('SET GLOBAL max_allowed_packet = 1000000000;');
        await sourceConnection.query('SET GLOBAL net_buffer_length = 1000000;');
        await targetConnection.query('SET foreign_key_checks = 0;');

        // Fetch tables with prefix "C_" from the source database
        const [tableRows] = await sourceConnection.query("SHOW TABLES LIKE 'C\\_%';");
        const tables = tableRows.map(row => Object.values(row)[0]);
        console.log(`Data transfer started at: ${new Date().toLocaleString()}`);
        // Process tables in parallel
        const promises = [];
        for (const sourceTable of tables) {
            const targetTable = sourceTable.substring(2);

            // Limit the number of parallel operations
            if (promises.length >= parallelism) {
                await Promise.race(promises);
            }

            const promise = transferTableData(sourceConnection, targetConnection, sourceTable, targetTable, batchSize)
                .then(() => {
                    // Remove the resolved promise from the array
                    console.log(`Transfer completed for table: ${sourceTable} at ${new Date().toLocaleString()}`);
                    const index = promises.indexOf(promise);
                    if (index > -1) {
                        promises.splice(index, 1);
                    }
                })
                .catch(error => {
                    console.error(`Error transferring table ${sourceTable} to ${targetTable}:`, error);
                });

            promises.push(promise);
        }

        await Promise.all(promises);
        // Re-enable foreign key checks and indexes in the target database
        await targetConnection.query('SET foreign_key_checks = 1;');
        // Optionally, re-enable indexes
        // await targetConnection.query('ALTER TABLE <targetTable> ENABLE KEYS;');
        const endTime = new Date();
        console.log(`Data transfer completed at: ${endTime.toLocaleString()}`);
    } catch (error) {
        console.error('Error during data transfer:', error);
    } finally {
        if (sourcePool) {
            await sourcePool.end();
        }
        if (targetPool) {
            await targetPool.end();
        }
    }
}


transferData(100000, 3);
