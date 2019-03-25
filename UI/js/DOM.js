
/*Не совсем понял, как именно должны работать демонстрационные функции, посему, возможно, реализовал их немного неверно.
Тем не менее, все более-менее работает. При необходимости могу их переписать.*/


'use strict';
class View {
    _posts;
    _user;


    constructor(postsList = []) {
        this._posts = postsList.slice();

    }

    getPage(skip = 0, top = 10, filterConfig = {}) {
        let foundPosts = this._posts.sort((post1, post2) => post2.createdAt.getTime() - post1.createdAt.getTime());
        if (filterConfig) {
            if (Object.prototype.hasOwnProperty.call(filterConfig, 'author')) {
                foundPosts = foundPosts.filter(post => post.author.includes(filterConfig.author));
            } else if (Object.prototype.hasOwnProperty.call(filterConfig, 'hashTags')) {
                if (filterConfig.hashTags.length !== 0) {
                    foundPosts = foundPosts.filter((post) => {
                        for (let i = 0; i < filterConfig.hashTags.length; i++) {
                            for (let j = 0; j < post.hashTags.length; j++) {
                                if (post.hashTags[j] === filterConfig.hashTags[i]) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    });
                }
            }
        }
        foundPosts = foundPosts.slice(skip, skip + top);
        if (PostList._checkObject(foundPosts) && foundPosts.length !== 0) {
            return foundPosts;
        }

        return null;
    }

    showPosts() {
        let displayedPosts = this.getPage(0, 20);
        displayedPosts.forEach(photoPost => this.addPhotoPostToHtml(photoPost, 1));
    }



    formatDate(date) {

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

    setUser(name) {
        this._user = name;
        if (this._user === 'Guest') {
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



    addPhotoPostToHtml(photoPost, show) {
        const posts = document.getElementById('posts');
        const temp = document.getElementById('temp');
        if (document.getElementById(photoPost.id) != null)
            return;

        let post = document.importNode(temp.content, true);

        post.querySelector('div[class="post"]').id = photoPost.id;
        post.getElementById('user').textContent = photoPost.author;
        post.getElementById('hashtags').textContent = photoPost.hashTags;
        post.getElementById('description').textContent = photoPost.description;
        post.getElementById('photo').src = photoPost.photoLink;

        post.getElementById('date').textContent = this.formatDate(photoPost.createdAt);
        if (photoPost.author !== this._user) {
            post.getElementById('edit').style.display = "none";
            post.getElementById('delete').style.display = "none";
        }

        if (show)
            posts.insertBefore(post, posts.lastChild);
        else
            posts.insertBefore(post, posts.firstChild);
    }


    addPhotoPost(photoPost) {
        var test = new PostList();
        if (test.add(photoPost))
            this.addPhotoPostToHtml(photoPost, 0);
    }

    removePhotoPost(id) {
        var test = new PostList();
        test.remove(id);
        let post = document.getElementById(id);
        if (post != null)
            posts.removeChild(post);
    }


    editPhotoPost(id, photoPost) {
        var test = new PostList();
        if (!test.edit(id, photoPost))
            return false;
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


    addAuthors() {
        var test = new PostList();
        let authorsList = test.getAuthors();
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



const PP = [
    {
        id: '1',
        description: 'Rocket launch',
        createdAt: new Date('2018-02-26T10:42:43'),
        author: 'Mask',
        photoLink: 'img/BSU.jpg',
        hashTags: ["#space #falcon"],
        likes: ["Бобр-Добр", 'SCP 096']
    },
    {
        id: '2',
        description: 'Моя плотина',
        createdAt: new Date('2018-03-26T09:42:43'),
        author: 'Бобр-Добр',
        photoLink: 'img/cat.jpg',
        hashTags: ["#милота"],
        likes: ['Мистер Твистер']
    },
    {
        id: '3',
        description: 'Я стал первым министром',
        createdAt: new Date('2018-04-27T11:43:43'),
        author: 'Мистер Твистер',
        photoLink: 'img/arena.jpg',
        hashTags: ['#работа #повышение'],
        likes: ["Бобр-Добр"]
    },
    {
        id: "4",
        description: "Узнаёте?",
        createdAt: new Date('2018-05-26T11:42:43'),
        author: "?",
        hashTags: ['#HarryPotter #HP'],
        likes: [],
        photoLink: 'img/HP.jpg'
    }
];

console.log("Приветствую.");
console.log("Базовая настройка общего вида страницы");
console.log("");
console.log("let qwer = new View(PP);");
let qwer = new View(PP);
console.log("Настройка пользователя");
console.log("qwer.setUser('Мистер Твистер');");
qwer.setUser("Мистер Твистер");
console.log("");
qwer.addAuthors();
console.log("");
console.log("Показать фотопосты");
console.log("qwer.showPosts();");
qwer.showPosts();
console.log("");
console.log("Изменить фотопост");
console.log("qwer.removePhotoPost('2');");
qwer.removePhotoPost("2");
console.log("");
console.log("Редактировать фотопост");
console.log('qwer.editPhotoPost("4", {description: "Изменили!",photoLink: "img/Change.jpg",hashtags: ["#ИЗМЕНИЛОСЬ!"]});');
qwer.editPhotoPost("4", {
    description: "Изменили!",
    photoLink: "img/Change.jpg",
    hashtags: ["#ИЗМЕНИЛОСЬ!"]
});
