// export const apiURL = "http://nocng.id.vn:9091/api";

export const apiURL = "http://localhost:8080/api";

export const modules = {
    toolbar: [
        [{ header: [1, 2, 3, false], }],
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

export const OAuthConfig = {
    clientId: "720549923520-qbmtr8g24bptcp90659vh6ffc39j9se6.apps.googleusercontent.com",
    redirectUri: "http://localhost:3000/authenticate",
    authUri: "https://accounts.google.com/o/oauth2/auth",
};