class PostList {
    _posts;
    _user;


    constructor(postsList, user) {
        this._posts = postsList.slice();
        this._user = user;
        this.restore();
    }

    clear() {
        this._posts = [];
        this._user = "";
    }


    save() {
        localStorage.setItem('posts', JSON.stringify(this._posts));
    }

    restore() {
        if (!localStorage.getItem('posts')) {
            localStorage.clear();
            localStorage.setItem('posts', JSON.stringify(this._posts));
        }
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
        var post = this.get(id);
        if (post.state === 'active') {
            post.state = 'deleted';
            this.save();
            return true;
        }
        return false;
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

    addPost(post) {
        if (!PostList.validate(post)) {
            return false;
        }
        this._posts.push(post);
        this.save();
        return true;
    }


    editPost(postID, editPost) {
        var post = this.get(postID);
        if (post != null && post.state === 'active') {
            if (editPost.description) {
                post.description = editPost.description;
            }
            if (editPost.photoLink) {
                post.photoLink = editPost.photoLink;
            }
            if (editPost.hashTags) {
                post.hashTags.splice(0, post.hashTags.length);
                for (var i = 0; i < editPost.hashTags.length; i++) {
                    post.hashTags[i] = editPost.hashTags[i];
                }
            }
            this.save();
            return true;
        }
        return false;
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


    static _checkObject(post) {
        return !!post;
    }

    getPage(skip, top, filterConfig) {
        var toShow = this._posts.filter(function (x) { return x.state !== 'deleted'; });

        skip = skip || 0;
        top = top || 10;

        if (!filterConfig) {
            toShow.sort(PostList.compareTo);
            return toShow.slice(skip, skip + top);
        }

        if (filterConfig) {
            if (filterConfig.author) {
                toShow = toShow.filter(function (x) { return x.author === filterConfig.author; });
            }
            if (filterConfig.createdAt) {
                toShow = toShow.filter(function (x) { return (x.createdAt.substr(0, 10) === filterConfig.createdAt); });
            }
            if (filterConfig.hashTags) {
                toShow = toShow.filter(function (x) {
                    return x.hashTags.indexOf(filterConfig.hashTags) !== -1;
                });
            }
            toShow.sort(PostList.compareTo);
            return toShow.slice(skip, skip + top);
        }
    }


    addAll(posts) {
        const error = [];
        for (var i = 0; i < posts.length; i++) {
            if (!PostList.validate(posts[i]))
                error.push(posts[i]);
        }

        return error;
    }



}



var posts = [
    {
        id: '1',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:49:00'),
        author: 'Alex',
        photoLink: 'img/photo1.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#bike'],
        likes: ['Robin', 'Regina', 'Cece', 'Nick']
    },

    {
        id: '2',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:48:00'),
        author: 'Julia',
        photoLink: 'img/photo2.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#book'],
        likes: ['Robin', 'Alex', 'Cece', 'Nick']
    },

    {
        id: '3',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:47:00'),
        author: 'Jess',
        photoLink: 'img/photo3.jpeg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#отпуск'],
        likes: ['Robin', 'Regina', 'Cece', 'Lexie']
    },

    {
        id: '4',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:46:00'),
        author: 'Robin',
        photoLink: 'img/photo4.jpg',
        state: 'active',
        hashTags: ['#qwerty', '#landscape', '#style'],
        likes: ['Alex', 'Regina', 'Cece', 'Nick']
    },

    {
        id: '5',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:45:00'),
        author: 'Regina',
        photoLink: 'img/photo5.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#тэг1'],
        likes: ['Robin', 'Regina', 'Cece', 'Alex']
    },

    {
        id: '6',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:44:00'),
        author: 'Cece',
        photoLink: 'img/photo6.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#book'],
        likes: ['Robin', 'Regina', 'Cece', 'Nick']
    },

    {
        id: '7',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:43:00'),
        author: 'Alex',
        photoLink: 'img/photo7.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#book'],
        likes: ['Robin', 'Regina', 'Alex', 'Nick']
    },

    {
        id: '8',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:42:00'),
        author: 'Lexie',
        photoLink: 'img/photo8.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#book'],
        likes: ['Alex', 'Regina', 'Cece', 'Nick']
    },

    {
        id: '9',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:41:00'),
        author: 'Nick',
        photoLink: 'img/photo9.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#book'],
        likes: ['Robin', 'Alex', 'Cece', 'Nick']
    },

    {
        id: '10',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:40:00'),
        author: 'Nick',
        photoLink: 'img/photo10.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#book'],
        likes: ['Robin', 'Regina', 'Cece', 'Nick']
    },

    {
        id: '11',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:39:00'),
        author: 'Joe',
        photoLink: 'img/photo11.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#book'],
        likes: ['Robin', 'Regina', 'Cece', 'Nick']
    },

    {
        id: '12',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:38:00'),
        author: 'Barney',
        photoLink: 'img/photo12.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#book'],
        likes: ['Robin', 'Regina', 'Cece', 'Nick']
    },

    {
        id: '13',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:37:00'),
        author: 'Alex',
        photoLink: 'img/photo13.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#book'],
        likes: ['Robin', 'Regina', 'Cece', 'Nick']
    },

    {
        id: '14',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:36:00'),
        author: 'Julia',
        photoLink: 'img/photo14.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#book'],
        likes: ['Robin', 'Regina', 'Cece', 'Nick']
    },

    {
        id: '15',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:35:00'),
        author: 'Jess',
        photoLink: 'img/photo15.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#book'],
        likes: ['Robin', 'Regina', 'Cece', 'Nick']
    },

    {
        id: '16',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:34:00'),
        author: 'Regina',
        photoLink: 'img/photo16.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#book'],
        likes: ['Robin', 'Regina', 'Cece', 'Nick']
    },

    {
        id: '17',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:33:00'),
        author: 'Barney',
        photoLink: 'img/photo17.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#book'],
        likes: ['Robin', 'Regina', 'Cece', 'Nick']
    },

    {
        id: '18',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:32:00'),
        author: 'Robin',
        photoLink: 'img/photo18.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#book'],
        likes: ['Robin', 'Regina', 'Cece', 'Nick']
    },

    {
        id: '19',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:31:00'),
        author: 'Lexie',
        photoLink: 'img/photo19.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#book'],
        likes: ['Robin', 'Regina', 'Cece', 'Nick']
    },

    {
        id: '20',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:30:00'),
        author: 'Lexie',
        photoLink: 'img/photo20.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#book'],
        likes: ['Robin', 'Regina', 'Cece', 'Nick']
    },
    {
        id: '21',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:29:00'),
        author: 'Alex',
        photoLink: 'img/photo21.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#book'],
        likes: ['Robin', 'Regina', 'Cece', 'Nick']
    },
    {
        id: '22',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:28:00'),
        author: 'Jess',
        photoLink: 'img/photo22.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#Japan'],
        likes: ['Robin', 'Regina', 'Cece', 'Nick']
    },
    {
        id: '23',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:27:00'),
        author: 'Robin',
        photoLink: 'img/photo23.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#цветы'],
        likes: ['Robin', 'Regina', 'Cece', 'Nick']
    },
    {
        id: '24',
        description: 'Пароль у всех пользователей - 1111',
        createdAt: new Date('2019-03-01T17:26:00'),
        author: 'Cece',
        photoLink: 'img/photo24.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#вечер'],
        likes: ['Robin', 'Regina', 'Cece', 'Nick']
    },
    {
        id: '25',
        description: 'Поздравляю, вам удалось докрутить до последнего поста!',
        createdAt: new Date('2019-03-01T17:25:00'),
        author: 'Julia',
        photoLink: 'img/photo25.jpg',
        state: 'active',
        hashTags: ['#summer', '#landscape', '#desert'],
        likes: ['Robin', 'Regina', 'Cece', 'Nick']
    }
];



let list = new PostList(posts, '');
list.restore();