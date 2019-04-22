'use strict';
class View {
    static _user;
    static idToDelete;
    static idToEdit;
    static editOrAdd;


    static setUser(name) {
        View._user = name;
        if (View._user === 'Гость') {
            document.getElementById('добавить').style.visibility = "hidden";
            document.getElementById('avatar').style.visibility = "hidden";
            document.getElementById('exit').style.display = "none";
            document.getElementById('reg').style.display = "initial";
            document.getElementById('username').style.visibility = "hidden";
        }
        else {
            document.getElementById('добавить').style.visibility = "visible";
            document.getElementById('avatar').style.visibility = "visible";
            document.getElementById('reg').style.display = "none";
            document.getElementById('exit').style.display = "initial";
            document.getElementById('username').style.visibility = "visible";
            document.getElementById('username').textContent = name;
        }
    }


    static formatDate(date) {

        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        let hh = date.getHours();
        let min = date.getMinutes();

        return hh + ':' + min + '   ' + dd + '.' + mm + '.' + yy;
    }


    static addPhotoPostToHtml(post) {
        let elements = document.getElementById('posts');
        let element = document.createElement("div");
        element.id = post.id;
        element.classList.add("posts");
        let str = "";
        for (let i = 0; i < post.hashTags.length; i++) {
            str = str + post.hashTags[i] + " ";
        }

        let a = ` 
        <div class="post" id=${post.id}>
                <div class="headPost" >
                    <img src="img/icon.JPG" alt="" class="userphoto">
                    <div id='user' class="username">${post.author}</div>
                    <div id='date' class="datapost"> ${View.formatDate(post.createdAt)}</div>
                </div>
                <div class="photo">
                    <img id='photo' src="${post.photoLink}" background-size: cover; alt="Memories" style="width:800 px; height:600px">
                </div>
                <div class="elements">
                   
                    <img id='cool' src="img/like.jpg" class="like">
                    <img id='foo' src="img/Unlike.jpg" class="like">
                    <img id='edit'  src="img/edit.JPG" class="setting">
                    <img id='delete' src="img/Корзина.JPG" class="delete">              
                    <div id='hashtags' class="hashtags"> ${str}                 
                    </div>
                </div>
                <textarea id="description" name="text" cols="109" rows="4" disabled placeholder=""
                    class="comment">${post.description} </textarea>
            </div>`;

        element.innerHTML = a;
        if (post.author !== View._user) {
            element.querySelector('#delete').style.display = "none";
            element.querySelector('#edit').style.display = "none";
        }
        var deleteModal = document.getElementById('deleteModal');
        var tempUser = JSON.parse(localStorage.getItem('tempUser'));
        if (tempUser !== "") {
            if (!(post.likes && post.likes.indexOf(tempUser) === -1)) {
                element.querySelector("#foo").style.display = "none";
            }
            else {
                element.querySelector("#cool").style.display = "none";
            }
        }
        else {
            element.querySelector("#cool").style.display = "none";
        }
        elements.appendChild(element);


        element.addEventListener('click', function (event) {
            var target = event.target;

            if (target.className === 'delete') {
                View.idToDelete = post.id;
                deleteModal.style.display = 'block';
            }

            if (target.className === 'setting') {
                View.editOrAdd="";
                document.getElementById('photoModal').src = post.photoLink;
                document.getElementById('nameModal').textContent = post.author;
                document.getElementById('dateModal').textContent = View.formatDate(post.createdAt);
                document.getElementById('shortDescrModal').value = post.description;
                document.getElementById('hashTagsModal').value = str;
                editModal.style.display = 'block';
                View.idToEdit = post.id;
                View.editOrAdd = 'edit';
            }

            if (tempUser !== "" && View._user !== 'Гость') {
                if (target.id === 'foo') {
                    element.querySelector("#foo").style.display = "none";
                    element.querySelector("#cool").style.display = "initial";
                    post.likes.push(tempUser);
                    list.save();
                }
                if (target.id === 'cool') {
                    element.querySelector("#foo").style.display = "initial";
                    element.querySelector("#cool").style.display = "none";
                    var index = post.likes.indexOf(tempUser);
                    if (index >= 0) {
                        post.likes.splice(index, 1);
                    }
                    list.save();
                }
            }
        });
    }


    static compareTo(a, b) {
        if (a.createdAt > b.createdAt) {
            return -1;
        }
        if (a.createdAt < b.createdAt) {
            return 1;
        }
        else {
            return 0;
        }
    }


    static showPosts(posts) {
        for (let i = 0; i < posts.length; i++) {
            View.addPhotoPostToHtml(posts[i]);
        }
    }

    static addPost(post) {
        var posts = document.getElementById('posts');
        var l = 0;
        while (posts.firstChild) {
            l = l + 1;
            posts.removeChild(posts.firstChild);
        }
        var save = JSON.parse(localStorage.getItem('posts'));
        save.push(post);
        save.sort(View.compareTo);
        for (var i = 0; i < l; i++) {
            save[i].createdAt = new Date(save[i].createdAt);
            View.addPhotoPostToHtml(save[i]);
        }
    }


    static removePost(id) {
        document.getElementById(id).remove();
    }


    static editPost(id, photoPost) {
        let post = document.getElementById(id);
        if (post != null) {
            if (photoPost.description !== undefined)
                post.querySelector('textarea[id="description"]').textContent = photoPost.description;
            if (photoPost.photoLink !== undefined)
                post.querySelector('img[id="photo"]').src = photoPost.photoLink;
            if (photoPost.hashTags) {
                let str = "";
                for (let i = 0; i < photoPost.hashTags.length; i++) {
                    str = str + photoPost.hashTags[i] + " ";
                }
                post.querySelector('div[id="hashtags"]').textContent = str;
            }
        }
    }


    static addAuthors(posts) {
        let array = [];
        for (let i = 0; i < posts.length; i++)
            array.push(posts[i].author);
        let authorsList = Array.from(new Set(array));
        let dl = document.createElement('datalist');
        document.querySelector('p[id="list"]').replaceChild(dl, document.querySelector('datalist[id="authors"]'));
        document.querySelector('datalist').id = "authors";
        authorsList.forEach(author => {
            let elem = document.createElement('option');
            elem.value = author;
            (document.querySelector('datalist[id="authors"]')).appendChild(elem);
        })
    }


    static addHashTags(photoPosts) {
        for (var k = 0; k < photoPosts.length; k++) {
            if (photoPosts[k].state === 'active' && typeof photoPosts[k].hashTags !== 'undefined') {
                for (var i = 0; i < photoPosts[k].hashTags.length; i++) {
                    var hasBeenHashtag = false;
                    var optionHashtag = document.createElement('option');
                    optionHashtag.value = photoPosts[k].hashTags[i];
                    optionHashtag.innerHTML = photoPosts[k].hashTags[i];
                    for (var j = 0; j < document.getElementById('hashtags').childNodes.length; j++) {
                        if (document.getElementById('hashtags').childNodes.item(j).value === photoPosts[k].hashTags[i]) {
                            hasBeenHashtag = true;
                            break;
                        }
                    }
                    if (!document.getElementById('hashtags').childNodes.length || !hasBeenHashtag) {
                        document.getElementById('hashtags').appendChild(optionHashtag);
                    }
                }
            }
        }
    }
    

}