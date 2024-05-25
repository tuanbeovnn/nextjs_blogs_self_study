export const apiURL = "http://nocng.id.vn:9091/api";

// export const apiURL = "http://localhost:8080/api";

export const modules = {
    toolbar: [
        [{ header: [1, 2, 3, false],  }],
        [{ 'font': [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ align: ["right", "center", "justify"] }],
        [{ list: "ordered" }, { list: "bullet" }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      }
};