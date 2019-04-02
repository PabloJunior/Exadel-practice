'use strict';
class View {
    _posts;
    _user;

    constructor() {
   }

    static setUser(name) {
        this._user = name;
        if (this._user === 'Гость') {
            document.getElementById('добавить').style.display = "none";
            document.getElementById('avatar').style.display = "none";
            document.getElementById('exit').src = "img/login.jpg";
            document.getElementById('username').style.display = "none";
            return undefined;
        }
        var user = document.getElementById('username');
        user.textContent = name;
        return user;
    }

    static addPhotoPostToHtml(photoPost) {
        const posts = document.getElementById('posts');
        const temp = document.getElementById('temp');
        if (document.getElementById(photoPost.id) != null)
            return;

        let post = document.importNode(temp.content, true);

        post.querySelector('div[class="post"]').id = photoPost.id;
        post.getElementById('user').textContent = photoPost.author;
        let str = "";
        for (let i = 0; i < photoPost.hashTags.length; i++) {
            str = str + photoPost.hashTags[i] + " ";
        }
        post.getElementById('hashtags').textContent = str;
        post.getElementById('description').textContent = photoPost.description;
        post.getElementById('photo').src = photoPost.photoLink;

        post.getElementById('date').textContent = View.formatDate(photoPost.createdAt);
        if (photoPost.author !== this._user) {
            post.getElementById('edit').style.display = "none";
            post.getElementById('delete').style.display = "none";
        }
        posts.append(post);
    }

    static addPost(post) {
        this.addPhotoPostToHtml(post);
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

    static showPosts(posts) {
        for (let i = 0; i < posts.length; i++) {
            View.addPhotoPostToHtml(posts[i]);
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
            if (photoPost.hashtags !== undefined)
                post.querySelector('div[id="hashtags"]').textContent = photoPost.hashtags;
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

}