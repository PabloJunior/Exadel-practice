class PostList {
    _posts;
    _user;

    constructor(postsList, user) {
        this._posts = postsList.slice();
        this._user = user;
    }

    clear() {
        this._posts = [];
        this._user = "";
    }

    static _checkObject(post) {
        return !!post;
    }

    getPage(skip = 0, top = 10, filterConfig = {}) {
        let foundPosts = this._posts.sort((post1, post2) => post1.creationDate - post2.creationDate);
        if (filterConfig) {
            if (Object.prototype.hasOwnProperty.call(filterConfig, 'author')) {
                foundPosts = foundPosts.filter(post => post.author === filterConfig.author);
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

    get(id) {
        if (typeof id !== "string") {
            return undefined;
        }
        var found = this._posts.find(function (element) {
            return element.id === id;
        })
        if (!found) {
            return undefined;
        }
        return found;
    }

    removePost(id) {
        if (typeof id !== "string") {
            return undefined;
        }
        if (!this.get(id)) {
            return false;
        }
        const remIndex = this._posts.indexOf(this.get(id));
        this._posts.splice(remIndex, 1);
        return true;
    }

    static validate(photoPost) {
        if (!photoPost) {
            return false;
        }
        if (!('likes' in photoPost && 'author' in photoPost && 'photoLink' in photoPost && 'createdAt' in photoPost && 'id' in photoPost && 'description' in photoPost && 'hashTags' in photoPost)) {
            return false;
        }
        if (photoPost.id === '' || typeof photoPost.id !== 'string') {
            return false;
        }
        if (photoPost.description === '' || typeof photoPost.description !== 'string' || photoPost.description.length > 200) {
            return false;
        }
        if (!(photoPost.createdAt instanceof Date) || photoPost.createdAt.toString() === "Invalid Date") {
            return false;
        }
        if (photoPost.author === '' || typeof photoPost.author !== 'string') {
            return false;
        }
        if (photoPost.photoLink === '' || typeof photoPost.photoLink !== 'string') {
            return false;
        }
        if (photoPost.likes === null) {
            return false;
        }
        return true;
    }

    addPost(photoPost) {
        if (!PostList.validate(photoPost)) {
            return false;
        }
        this._posts.push(photoPost);
        return true;
    }

    addAll(posts) {
        const error = [];
        posts.forEach((post) => {
            if (!PostList.validate(post)) error.push(post);
        });
        return error;
    }

    static isEmpty(someString) {
        return !someString.trim();
    }

    static _checkString(someString) {
        return typeof someString === 'string';
    }

    editPost(id, photoPost) {
        if (!this.get(id)) {
            return false;
        }
        let obj = this.get(id);
        if ('hashTags' in photoPost) {
            if (PostList._checkString(photoPost.hashTags)) {
                let str = "";
                for (let i = 0; i < photoPost.hashTags.length; i++) {
                    str = str + photoPost.hashTags[i] + " ";
                }
                obj.hashTags = str;
            }
            else return false;
        }
        if ('photoLink' in photoPost) {
            if (!PostList.isEmpty(photoPost.photoLink))
                obj.photoLink = photoPost.photoLink;
            else
                return false;
        }
        if ('description' in photoPost) {
            obj.description = photoPost.description;
        }
        if (!PostList.validate(obj)) {
            return false;
        }
        this.get(id) === obj;
        return true;
    }


}



const PP = [
    {
        id: '1',
        description: 'Rocket launch',
        createdAt: new Date('2018-02-26T10:42:43'),
        author: 'Mask',
        photoLink: 'img/BSU.jpg',
        hashTags: ["#space", "#falcon"],
        likes: ["Бобр-Добр", 'SCP 096']
    },
    {
        id: '2',
        description: 'Моя плотина',
        createdAt: new Date('2018-03-26T09:42:43'),
        author: 'Мистер Твистер',
        photoLink: 'img/cat.jpg',
        hashTags: ["#милота", "#котэ"],
        likes: ['Мистер Твистер']
    },
    {
        id: '3',
        description: 'Я стал первым министром',
        createdAt: new Date('2018-04-27T11:43:43'),
        author: 'Takseda Mask',
        photoLink: 'img/arena.jpg',
        hashTags: ['#работа', '#повышение'],
        likes: ["Бобр-Добр"]
    },
    {
        id: "4",
        description: "Узнаёте?",
        createdAt: new Date('2018-05-26T11:42:43'),
        author: "?",
        hashTags: ['#HarryPotter', '#HP'],
        likes: [],
        photoLink: 'img/HP.jpg'
    }
];



let list = new PostList(PP, '');