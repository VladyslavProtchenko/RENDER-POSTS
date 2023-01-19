const dbScheme = {
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
const DB = JSON.parse(localStorage.getItem('db')) || {posts:[]};

function createDB(){
    if(localStorage.getItem('db')) {
        localStorage.setItem('db', JSON.stringify(DB));
    }
    localStorage.setItem('db', JSON.stringify(dbScheme));
}


createDB();

//___________________________________________________VARIABLES____________________________________________________
const postsHTML = document.querySelector('.posts');
const buttonSubmit = document.querySelector('.submit');
const title = document.querySelector(".title");
const postText = document.querySelector(".content");


//_____________________________________________________FORM_CHECKOUT________________________________________________
buttonSubmit.setAttribute('disabled', true);

function check() {
    if(!title.value || !postText.value) {
        buttonSubmit.setAttribute('disabled', true);
    } else  {
        buttonSubmit.removeAttribute('disabled');
    }
}

title.addEventListener('input', check)
postText.addEventListener('input', check)

//_______________________________________________components_______________________________________________________________
function commentsComponent (item) {
    return (
        `<article class="comments hidden" id="${item.id}">
                <h2 class="comments-header">Comments:</h2>
                <ul class="comments-list"></ul>
                
                <form action="" class="form comments-form" onsubmit="event.preventDefault()">
        
                    <textarea class="comments-text" ></textarea>
                    <button type="submit" class="btn comments-button">add comment</button>

                </form>
                <button href="" class="hide-comments string-btn ">close</button>
            </article>`
    )         
}

function postComponent (item) {
    return (
        `<article class='post'>
        <h1 class='post-header'>${item.title}</h1>
        <p class="post-text">${item.text}</p>
        <button class="show-comments">show comments</button>
        ${commentsComponent(item)}
    </article>`
    )
}

function comemntComponent(text) {
    return (
        `<li class="comment"><p>${text}</p> <div class="delete-comment">x</div> </li>`
    )
}

//___________________________________________________RENDER-POSTS___________________________________________________________
function renderPosts() {
    postsHTML.innerHTML = null;
    DB.posts.map(item =>{
        postsHTML.insertAdjacentHTML("afterbegin",postComponent(item, item.comments))
    })
    const posts = document.querySelectorAll('.post');
    posts.forEach(item => actions(item))

}
renderPosts();
//__________________________________________________ACTIONS__________________________________________________________________
const posts = document.querySelectorAll('.post');
function removeComment(){
    const deleteComment = document.querySelectorAll('.delete-comment');

    function deleter (event){
    event.target.parentElement.remove();
    }
    deleteComment.forEach(item=>{
        item.removeEventListener('click',deleter)
        item.addEventListener('click',deleter)
    })
}

function actions(post) {
    const showComments = post.children[2];
    const comments = showComments.nextElementSibling;
    const postData = DB.posts.find(item=>item.id == comments.id);

    const commentsChildren = comments.children;
    const closeComments = commentsChildren[3];
    const commentsList = commentsChildren[1];

    const commentsFormChildren = commentsChildren[2].children;
    const commentsInput = commentsFormChildren[0];
    const commentsSubmit = commentsFormChildren[1];
    commentsSubmit.setAttribute('disabled', true);


    showComments.addEventListener('click',(event)=>{
        const comments = event.target.nextElementSibling;
        comments.classList.toggle("hidden");
        if (showComments.innerHTML === "show comments") {
            showComments.innerHTML = "hide comments";
            const closeAll = document.querySelectorAll('.comments');
            
            closeAll.forEach(item=>{
                if(item==event.target.nextElementSibling){ return }
                item.classList.add('hidden')
                item.previousElementSibling.innerHTML = "show comments"
            })
        } else {
            showComments.innerHTML = "show comments";
        }
    })

    closeComments.addEventListener('click',()=>{
        comments.classList.add("hidden");
        showComments.innerHTML = "show comments";
    })

    function checkComments() {
        if(commentsInput.value.length>4){
            commentsSubmit.removeAttribute('disabled');
        }
    }   commentsInput.addEventListener('input', checkComments);

    function renderPosts() {
        commentsList.innerHTML = '';
        postData.comments.forEach(item=> {
            commentsList.insertAdjacentHTML('afterbegin',comemntComponent(item))
        })
        removeComment()
    }   renderPosts()

    function getComment(){
        postData.comments.unshift(commentsInput.value);
        commentsInput.value='';
        renderPosts();
        commentsSubmit.setAttribute('disabled', true);

        localStorage.setItem('db', JSON.stringify(DB));
    }
    commentsSubmit.addEventListener('click',getComment)
    
    removeComment();
}   



//____________________________________________________GET-POST______________________________________________________________
function getPost() {
    const count = DB.posts.length
    const createPost={};
    createPost.id = count+1;
    createPost.title = title.value;
    createPost.text = postText.value;
    createPost.comments =[];
    DB.posts.push(createPost);

    title.value ='';
    postText.value='';
    buttonSubmit.setAttribute('disabled', true);

    postsHTML.insertAdjacentHTML("afterbegin", postComponent(createPost));

    localStorage.setItem('db', JSON.stringify(DB));
    const posts = document.querySelectorAll('.post');
    actions(posts[0]);
}
removeComment();





