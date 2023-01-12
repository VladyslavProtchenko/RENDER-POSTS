const storage = {
    posts: [
        {   
            id: 1,
            title: "first post",
            text: "here is some text",
            comments: ['1comment', '1comment2','1comment3'],
        },
        {   
            id: 2,
            title: "secon post",
            text: "hello ",
            comments: ['2comment', '2comment2','2comment3'],
        },
        {   
            id: 3,
            title: "third post",
            text: "Its Me",
            comments: ['3comment', '3comment2','3comment3'],
        },
    ],
}

localStorage.setItem('db', JSON.stringify(storage));






