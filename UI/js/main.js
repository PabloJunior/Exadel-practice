const modul = (function () {
    return {
        setUser(name) {
            list._user = name;
            View.setUser(list._user);
           
        },
        addAll(posts) {
            const error = list.addAll(posts);
            View.showPosts(list.getPage(0, 10 - error.length));
            View.addAuthors(posts);
        },
        removePost(id) {
            if (list.removePost(id)) {
                View.removePost(id);
            }
        },
        editPost(id, post) {
            if (list.editPost(id, post)) {
                View.editPost(id, post);
            }
        },
        addPost(post) {
            if (list.addPost(post))
                View.addPost(post);
        }
    }
})();



modul.setUser('Мистер Твистер');
modul.addAll(PP);
modul.removePost("3");
modul.editPost("4", { description: "Поменяли!", photoLink: "img/Change.jpg" });
modul.addPost({
    id: '3',
    description: 'Я стал первым министром',
    createdAt: new Date('2018-04-27T11:43:43'),
    author: 'Takseda Mask',
    photoLink: 'img/arena.jpg',
    hashTags: ['#работа', '#повышение'],
    likes: ["Бобр-Добр"]
});
