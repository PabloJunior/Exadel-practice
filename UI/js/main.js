var modul = (function () {

    function addAll(posts) {
       
        const error = list.addAll(posts);
        View.showPosts(list.getPage(0, 10 - error.length));
        View.addAuthors(posts);
        View.addHashTags(posts);
    }

    function setUser(name) {
        list._user = name;
        View.setUser(list._user);
    }

    function removePost(id) {
        if (list.removePost(id)) {
            View.removePost(id);
            View.addAuthors(posts);
            View.addHashTags(list._posts);
        }
    }

    function editPost(id, post) {
        if (list.editPost(id, post)) {
            View.editPost(id, post);
            View.addHashTags(list._posts);
        }
    }

    function addPost(post) {
        if (list.addPost(post)){
            View.addPost(post);
            View.addHashTags(list._posts);
        }
    }

    return {
        setUser: setUser,
        addAll: addAll,
        removePost: removePost,
        editPost: editPost,
        addPost: addPost
    }
}());

modul.setUser("Гость");
modul.addAll(posts);
modul.editPost("2", { description: "Поменяли!", photoLink: "img/Change.jpg",hashTags: ['#Поменяли', '#qwerty'] });
