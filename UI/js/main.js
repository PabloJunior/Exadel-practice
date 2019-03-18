
var modul = (function () {
    var photoPosts = [
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

    return {

        getPhotoPosts: function (skip, top, filterConfig) {
            if (!isInteger(skip) || !isInteger(top))
                return false;
            if (skip < 0 || top <= 0)
                return false;
            var arr = photoPosts.slice();
            var result = [];
            if (filterConfig != null) {
                if ('author' in filterConfig && (filterConfig.author instanceof String || typeof filterConfig.author === 'string')) {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].author.includes(filterConfig.author)) {
                            result.push(arr[i]);
                        }
                    }
                    arr.splice(0, arr.length);
                    for (var i = 0; i < result.length; i++) {
                        arr.push(result[i]);
                    }
                    result.splice(0, result.length);
                }
                if ('hashTags' in filterConfig && Array.isArray(filterConfig.hashTags) && filterConfig.hashTags.length !== 0) {
                    for (var i = 0; i < arr.length; i++) {
                        for (var j = 0; j < filterConfig.hashTags.length; j++) {
                            if (arr[i].hashTags.indexOf(filterConfig.hashTags[j]) !== -1) {
                                if (j === filterConfig.hashTags.length - 1)
                                    result.push(arr[i]);
                            }
                            else
                                break;

                        }
                    }
                    arr.splice(0, arr.length);
                }
                for (var k = 0; k < result.length; k++) {
                    arr.push(result[k]);
                }
            }
            result.splice(0, arr.length);
            arr.sort(compareDates);
            if (skip >= arr.length)
                return false;
            var max = arr.length;
            if (skip + top < arr.length)
                max = skip + top;
            for (var i = skip; i < max; i++) {
                result.push(arr[i]);
            }
            if (!result) {
                console.log("Отсутствует элемент, подходящий заданным параметрам");
            }
            else
                return result;
        },


        getPhotoPost: function (id) {
            if (typeof (id) === "string") {
                var num = parseInt(id);
                if (num > 0 && num <= photoPosts.length) {
                    var found = photoPosts.find(function (element) {
                        return element.id === id;
                    })
                    if (!found) {
                        console.log("Нет элемента с таким id либо он был удален");
                    }
                    else { return found; }

                }
                else {
                    console.log("Нет элемента с таким id");

                }

            }
            else {
                console.log("В функцию были переданы аргументы неподходящего типа");

            }
        },


        validatePhotoPost: function (photoPost) {
            if (!photoPost) {
                return false;
            }
            if (!('likes' in photoPost && 'author' in photoPost && 'photoLink' in photoPost && 'createdAt' in photoPost && 'id' in photoPost && 'description' in photoPost && 'hashTags' in photoPost)) {
                return false;
            }
            if (!photoPost.id) {
                return false;
            }
            if (!photoPost || photoPost.description.length > 200) {
                return false;
            }
            if (!(photoPost.createdAt instanceof Date) || photoPost.createdAt.toString() === "Invalid Date") {
                return false;
            }
            if (!photoPost.author) {
                return false;
            }
            if (!photoPost.photoLink) {
                return false;
            }
            if (photoPost.likes === null) {
                return false;
            }

            return true;
        },


        addPhotoPost: function (photoPost) {
            for (var i = 0; i < photoPosts.length; i++) {
                if (photoPost.id === photoPosts[i].id) {
                    console.log("Пост с таким id уже существует, измените id нового поста");
                    return false;
                }
            }
            if (this.validatePhotoPost(photoPost)) {
                photoPost.id = ""+(photoPosts.length + 1);
                photoPosts.push(photoPost);
                return true;
            }
            else
                return false;
        },


        editPhotoPost: function (id, photoPost) {
            if (!photoPost) {
                console.log("В функцию не был передан фотопост, который надо изменить");
                return false;
            }

            if (typeof (id) === "string") {

                if (this.validatePhotoPost(photoPost)) {
                    if (num > 0 && num <= photoPosts.length) {
                        var num = parseInt(id);
                        var obj = photoPosts[num - 1];
                        if ('hashTags' in photoPost) {
                            obj.hashTags = photoPost.hashTags;
                        }
                        if ('photoLink' in photoPost) {
                            obj.photoLink = photoPost.photoLink;
                        }
                        if ('description' in photoPost) {
                            obj.description = photoPost.description;
                        }
                        return true;
                    }
                    else
                        return false;
                }
            }
            else {
                console.log("В функцию были переданы аргументы неподходящего типа");
                return false;
            }
        },


        removePhotoPost: function (id) {
            if (typeof (id) === "string") {
                var num = parseInt(id);
                if (num > 0 && num <= photoPosts.length) {

                    for (var i = 0; i < photoPosts.length; ++i) {
                        if (parseInt(photoPosts[i].id) === num) {
                            photoPosts.splice(i, 1);
                            return true;
                        }
                    }
                }
                else {
                    console.log("Нет элемента с таким id");
                    return false;
                }
            }
            else {
                console.log("В функцию были переданы аргументы неподходящего типа");
                return false;
            }
        }

    }


    function isInteger(num) {
        return (num ^ 0) === num;
    }


    function compareDates(a, b) {
        return b.createdAt - a.createdAt;
    }

})();



console.log("Приветствую.");
console.log("Для проверки функций перед названием функции пишите 'modul.'.");
console.log("К примеру, modul.getPhotoPost(\"12\").");


console.log("");
console.log("");
console.log("Проверка getPhotoPosts:");
console.log("modul.getPhotoPosts(0, 10)");
console.log(modul.getPhotoPosts(0, 10));
console.log("modul.getPhotoPosts(10, 10)");
console.log(modul.getPhotoPosts(10, 10));
console.log("modul.getPhotoPosts(0, 20, { author: 'Mas' })");
console.log(modul.getPhotoPosts(0, 20, { author: 'Mas' }));


console.log("");
console.log("");
console.log("Проверка getPhotoPost:");
console.log("modul.getPhotoPost(10)");
console.log(modul.getPhotoPost(10));
console.log("modul.getPhotoPost(\"10\")");
console.log(modul.getPhotoPost("10"));
console.log("modul.getPhotoPost(\"-10\")");
console.log(modul.getPhotoPost("-10"));
console.log("modul.getPhotoPost(\"290\")");
console.log(modul.getPhotoPost("290"));
console.log("modul.getPhotoPost(\"asdsddsadssda\")");
console.log(modul.getPhotoPost("asdsddsadssda"));


console.log("");
console.log("");
console.log("Проверка validatePhotoPost:");
console.log("modul.validatePhotoPost({id: '23',description: 'Nexus 10',createdAt: new Date('2019-03-08T21:57:49'),author: 'KillerMask',photoLink: 'http://photoportal.by/photos/18',hashTags: [],likes: []})");
console.log(modul.validatePhotoPost({ id: '23', description: 'Nexus 10', createdAt: new Date('2019-03-08T21:57:49'), author: 'KillerMask', photoLink: 'http://photoportal.by/photos/18', hashTags: [], likes: [] }));
console.log("modul.validatePhotoPost({description: 'Nexus 10',createdAt: new Date('2019-03-08T21:57:49'),author: 'KillerMask',photoLink: 'http://photoportal.by/photos/18',hashTags: [],likes: []})");
console.log(modul.validatePhotoPost({ description: 'Nexus 10', createdAt: new Date('2019-03-08T21:57:49'), author: 'KillerMask', photoLink: 'http://photoportal.by/photos/18', hashTags: [], likes: [] }));


console.log("");
console.log("");
console.log("Проверка addPhotoPost:");
console.log("modul.addPhotoPost({description: 'Nexus 10',createdAt: new Date('2019-03-08T22:57:49'),author: 'KillerMask',photoLink: 'http://photoportal.by/photos/18',hashTags: [],likes: []})");
console.log(modul.addPhotoPost({ id: '23', description: 'Nexus 10', createdAt: new Date('2019-03-08T22:57:49'), author: 'KillerMask', photoLink: 'http://photoportal.by/photos/18', hashTags: [], likes: [] }));
console.log("modul.getPhotoPosts(0, 21)");
console.log(modul.getPhotoPosts(0, 21));
console.log("modul.addPhotoPost({id:'18',description: 'Nexus 10',createdAt: new Date('2019-03-08T21:57:49'),author: 'KillerMask',photoLink: 'http://photoportal.by/photos/18',hashTags: [],likes: []})");
console.log(modul.addPhotoPost({ id: '18', description: 'Nexus 10', createdAt: new Date('2019-03-08T22:57:49'), author: 'KillerMask', photoLink: 'http://photoportal.by/photos/18', hashTags: [], likes: [] }));


console.log("");
console.log("");
console.log("Проверка editPhotoPost:");
console.log('modul.getPhotoPost("10")');
console.log(modul.getPhotoPost("10"));
console.log("modul.editPhotoPost('10', { description:'Поменяли',photoLink: 'http://haradok.info/static/news/5/4565/preview.jpg' })");
console.log(modul.editPhotoPost('10', { description: 'Поменяли', photoLink: 'http://haradok.info/static/news/5/4565/preview.jpg' }));
console.log('modul.getPhotoPost("10")');
console.log(modul.getPhotoPost("10"));


console.log("");
console.log("");
console.log("Проверка removePhotoPost:");
console.log('modul.getPhotoPost("10")');
console.log(modul.getPhotoPost("10"));
console.log('modul.removePhotoPost("10")');
console.log(modul.removePhotoPost("10"));
console.log('modul.getPhotoPost("10")');
console.log(modul.getPhotoPost("10"));


