

class PostList {
    _posts;


    constructor(postsList = []) {
        this._posts = postsList.slice();

    }


    clear() {
        this._posts = [];
    }


    addAll(posts) {
        if (posts) {
            var photos = this;
            var error = [];
            posts.forEach(function (item) {
                if (!photos.add(item)) {
                    error.push(item);
                }
            });
            return error;
        }
        return posts;
    }


    get(id) {
        if (typeof id !== "string") {
            console.log("В функцию были переданы аргументы неподходящего типа");
            return undefined;
        }
        var num = Number.parseInt(id, 10);
        var found = photoPosts.find(function (element) {
            return element.id === id;
        })
        if (!found) {
            console.log("Нет элемента с таким id либо он был удален");
            return undefined;
        }
        return found;
    }


    remove(id) {
        if (typeof id !== "string") {
            console.log("В функцию были переданы аргументы неподходящего типа");
            return undefined;
        }
        if (!this.get(id)) {
            console.log("Нет элемента с таким id");
            return false;
        }
        const remIndex = photoPosts.indexOf(this.get(id));
        photoPosts.splice(remIndex, 1);
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


    add(photoPost) {
        if (!PostList.validate(photoPost)) {
            return false;
        }
        photoPost.id = "" + (photoPosts.length + 1);
        photoPosts.push(photoPost);
        return true;
    }

    edit(id, photoPost) {
        if (!this.get(id)) {
            return false;
        }
        let obj = this.get(id);
        if ('hashTags' in photoPost) {
            obj.hashTags = photoPost.hashTags;
        }
        if ('photoLink' in photoPost) {
            obj.photoLink = photoPost.photoLink;
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




    static _checkObject(post) {
        return !!post;
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
    
  

}



const photoPosts = [
    {
        id: '1',
        description: 'Rocket launch',
        createdAt: new Date('2019-03-08T21:30:00'),
        author: 'Mask',
        photoLink: 'http://photoportal.by/photos/1',
        hashTags: ["#space", "#falcon"],
        likes: ["Бобр-Добр", 'SCP 096']
    },
    {
        id: '2',
        description: 'Моя плотина',
        createdAt: new Date('2019-03-08T21:31:10'),
        author: 'Бобр-Добр',
        photoLink: 'http://photoportal.by/photos/2',
        hashTags: ["#работа"],
        likes: ['Мистер Твистер']
    },
    {
        id: '3',
        description: 'Я стал первым министром',
        createdAt: new Date('2019-03-08T21:32:43'),
        author: 'Мистер Твистер',
        photoLink: 'http://photoportal.by/photos/3',
        hashTags: ['работа'],
        likes: ["Бобр-Добр"]
    },
    {
        id: '4',
        description: "Don't look at me!",
        createdAt: new Date('2019-03-08T21:39:23'),
        author: 'SCP 096',
        photoLink: 'http://photoportal.by/photos/4',
        hashTags: ["#SCP"],
        likes: ['Кнаклз из Уганды']
    },
    {
        id: '5',
        description: 'Мне такое не нравится',
        createdAt: new Date('2019-03-08T21:40:56'),
        author: 'Mask',
        photoLink: 'http://photoportal.by/photos/5',
        hashTags: ["#ответ_русским"],
        likes: ["Бобр-Добр"]
    },
    {
        id: '6',
        description: 'Do you know de way?',
        createdAt: new Date('2019-03-08T21:45:13'),
        author: 'Кнаклз из Уганды',
        photoLink: 'http://photoportal.by/photos/6',
        hashTags: ["#sonicX", "memes"],
        likes: ["?"]
    },
    {
        id: '7',
        description: '?',
        createdAt: new Date('2019-03-08T21:46:50'),
        author: '?',
        photoLink: 'http://photoportal.by/photos/7',
        hashTags: ["?"],
        likes: []
    },
    {
        id: '8',
        description: 'javascript',
        createdAt: new Date('2019-03-08T21:47:56'),
        author: 'Мистер Твистер',
        photoLink: 'http://photoportal.by/photos/8',
        hashTags: ["programming"],
        likes: ["?"]
    },
    {
        id: '9',
        description: 'Rose',
        createdAt: new Date('2019-03-08T21:48:23'),
        author: 'TaksedaMask',
        photoLink: 'http://photoportal.by/photos/9',
        hashTags: ["SailorMoon", "anime"],
        likes: ['Кнаклз из Уганды']
    },
    {
        id: '10',
        description: '?',
        createdAt: new Date('2019-03-08T21:49:44'),
        author: '?',
        photoLink: 'http://photoportal.by/photos/10',
        hashTags: ['#?'],
        likes: ['TaksedaMask']
    },
    {
        id: '11',
        description: 'black',
        createdAt: new Date('2019-03-08T21:50:55'),
        author: 'Alex',
        photoLink: 'http://photoportal.by/photos/11',
        hashTags: [],
        likes: []
    },
    {
        id: '12',
        description: '?',
        createdAt: new Date('2019-03-08T21:51:11'),
        author: '?',
        photoLink: 'http://photoportal.by/photos/12',
        hashTags: ['#?'],
        likes: []
    },
    {
        id: '13',
        description: 'Пика-пика-пика-чууу',
        createdAt: new Date('2019-03-08T21:52:24'),
        author: 'Пикачу',
        photoLink: 'http://photoportal.by/photos/13',
        hashTags: ["#pokemon", "pikachu"],
        likes: []
    },
    {
        id: '14',
        description: 'I will get my revenge, Doctor!',
        createdAt: new Date('2019-03-08T21:53:57'),
        author: 'TheMaster',
        photoLink: 'http://photoportal.by/photos/14',
        hashTags: ["#DoctorWho"],
        likes: []
    },
    {
        id: '15',
        description: '?',
        createdAt: new Date('2019-03-08T21:54:12'),
        author: '?',
        photoLink: 'http://photoportal.by/photos/15',
        hashTags: ['#?'],
        likes: []
    },
    {
        id: '16',
        description: '?',
        createdAt: new Date('2019-03-08T21:55:30'),
        author: '?',
        photoLink: 'http://photoportal.by/photos/16',
        hashTags: [],
        likes: []
    },
    {
        id: '17',
        description: 'New plan',
        createdAt: new Date('2019-03-08T21:56:44'),
        author: 'TheMaster',
        photoLink: 'http://photoportal.by/photos/17',
        hashTags: [],
        likes: []
    },
    {
        id: '18',
        description: '?',
        createdAt: new Date('2019-03-08T21:57:49'),
        author: 'KillerMask',
        photoLink: 'http://photoportal.by/photos/18',
        hashTags: [],
        likes: []
    },
    {
        id: '19',
        description: '?',
        createdAt: new Date('2019-03-08T21:58:11'),
        author: '?',
        photoLink: 'http://photoportal.by/photos/19',
        hashTags: ['#?'],
        likes: []
    },
    {
        id: '20',
        description: '?',
        createdAt: new Date('2019-03-08T21:59:00'),
        author: '?',
        photoLink: 'http://photoportal.by/photos/20',
        hashTags: ['#?'],
        likes: []
    }
];


console.log("Приветствую.");
let test = new PostList(photoPosts);
console.log("let test = new PostList(photoPosts);");
console.log("");
console.log("");
console.log("test._posts");
console.log(test._posts);
console.log("");
console.log("");
console.log("test.getPage(0, 10)");
console.log(test.getPage(0, 10));
console.log("test.getPage(10, 10)");
console.log(test.getPage(10, 10));
console.log("test.getPage(0, 10, {author: 'Mas'})");
console.log(test.getPage(0, 10, {author: 'Mas'}));
console.log("");
console.log("");
console.log("test.get('10')");
console.log(test.get("10"));
console.log("test.get('ыыыыыыыыыыыыыыы')");
console.log(test.get("ыыыыыыыыыыыыыыы"));
console.log('test.get(10)');
console.log(test.get(10));
console.log("");
console.log("");
console.log("PostList.validate({ id: '23', description: 'Nexus 10', createdAt: new Date('2019-03-08T21:57:49'), author: 'KillerMask', photoLink: 'http://photoportal.by/photos/18', hashTags: [], likes: [] })");
console.log(PostList.validate({ id: '23', description: 'Nexus 10', createdAt: new Date('2019-03-08T21:57:49'), author: 'KillerMask', photoLink: 'http://photoportal.by/photos/18', hashTags: [], likes: [] }));
console.log("PostList.validate({ id: '', description: 'Nexus 10', createdAt: new Date('2019-03-08T21:57:49'), author: 'KillerMask', photoLink: 'http://photoportal.by/photos/18', hashTags: [], likes: [] })");
console.log(PostList.validate({ id: '', description: 'Nexus 10', createdAt: new Date('2019-03-08T21:57:49'), author: 'KillerMask', photoLink: 'http://photoportal.by/photos/18', hashTags: [], likes: [] }));
console.log("");
console.log("");
console.log("test.add({ id: '23', description: 'Nexus 10', createdAt: new Date('2019-03-08T21:57:49'), author: 'KillerMask', photoLink: 'http://photoportal.by/photos/18', hashTags: [], likes: [] })");
console.log(test.add({ id: '23', description: 'Nexus 10', createdAt: new Date('2019-08-08T21:57:49'), author: 'KillerMask', photoLink: 'http://photoportal.by/photos/18', hashTags: [], likes: [] }));
console.log("");
console.log("");
console.log("test.get('1')");
console.log(test.get("1"));
console.log("test.edit('1', { photoLink: 'http://haradok.info/static/news/5/4565/preview.jpg,description:'Поменяли!'' })");
console.log(test.edit('1', { photoLink: 'http://haradok.info/static/news/5/4565/preview.jpg', description: "Поменяли!" }));
console.log("test.get('1')");
console.log(test.get("1"));
console.log("");
console.log("");
console.log("test.clear();");
test.clear();
console.log("test._posts");
console.log(test._posts);
