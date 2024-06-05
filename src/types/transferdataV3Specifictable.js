const mysql = require('mysql2/promise');

async function transferTableData(sourcePool, targetPool, sourceTable, targetTable, batchSize) {
    const sourceConnection = await sourcePool.getConnection();
    const targetConnection = await targetPool.getConnection();

    try {
        // Disable foreign key checks in the target database
        await targetConnection.query('SET foreign_key_checks = 0;');

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
                    console.log("Error ", err)
                    await targetConnection.rollback();
                    throw err;
                }
            }
        } while (rows.length === batchSize);

    } finally {
        // Re-enable foreign key checks in the target database
        await targetConnection.query('SET foreign_key_checks = 1;');

        sourceConnection.release();
        targetConnection.release();
    }
}

async function transferData(batchSize = 50000) {
    // Configure the source and target database connections
    const sourceConfig = {
        host: 'localhost',
        port: 53306,
        user: 'perin',
        password: '',
        database: 'perin_oracle',
        connectionLimit: 10, // Use connection pooling
        connectTimeout: 60000, // Increase timeout to 60 seconds
        acquireTimeout: 60000, // Increase acquire timeout to 60 seconds
    };

    const targetConfig = {
        host: 'localhost',
        port: 53306,
        user: 'perin',
        password: '',
        database: 'perin',
        connectionLimit: 10, // Use connection pooling
        connectTimeout: 60000, // Increase timeout to 60 seconds
        acquireTimeout: 60000, // Increase acquire timeout to 60 seconds
    };

    let sourcePool, targetPool;

    try {
        // Set global max_allowed_packet and net_buffer_length
        const sourceConnection = await mysql.createConnection(sourceConfig);
        await sourceConnection.query('SET GLOBAL max_allowed_packet = 1000000000;');
        await sourceConnection.query('SET GLOBAL net_buffer_length = 1000000;');
        await sourceConnection.end();

        // Create connection pools
        sourcePool = mysql.createPool(sourceConfig);
        targetPool = mysql.createPool(targetConfig);

        console.log(`Data transfer started for table C_OSAPUOLI to OSAPUOLI at: ${new Date().toLocaleString()}`);

        // Transfer data for the specific table
        await transferTableDataWithRetry(sourcePool, targetPool, 'C_OSAPUOLI', 'OSAPUOLI', batchSize);

        console.log(`Transfer completed for table: C_OSAPUOLI to OSAPUOLI at ${new Date().toLocaleString()}`);

        // Re-enable foreign key checks in the target database
        const targetConnection = await targetPool.getConnection();
        await targetConnection.query('SET foreign_key_checks = 1;');
        // Optionally, re-enable indexes
        // await targetConnection.query('ALTER TABLE <targetTable> ENABLE KEYS;');
        targetConnection.release();

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

async function transferTableDataWithRetry(sourcePool, targetPool, sourceTable, targetTable, batchSize, retries = 5) {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            await transferTableData(sourcePool, targetPool, sourceTable, targetTable, batchSize);
            return;
        } catch (error) {
            if (attempt < retries - 1) {
                console.error(`Error transferring table ${sourceTable} to ${targetTable}, attempt ${attempt + 1} of ${retries}:`, error);
                console.log('Retrying...');
            } else {
                throw error;
            }
        }
    }
}

// Run the transfer function with a batch size of 50000 for testing
transferData(50000);
