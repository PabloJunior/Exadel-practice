window.eventListeners= (function () {

    users = [
        {
            name: 'Alex',
            password: '1111'
        },
        {
            name: 'Julia',
            password: '1111'
        },
        {
            name: 'Jess',
            password: '1111'
        },
        {
            name: 'Robin',
            password: '1111'
        },
        {
            name: 'Regina',
            password: '1111'
        },
        {
            name: 'Cece',
            password: '1111'
        },
        {
            name: 'Lexie',
            password: '1111'
        },
        {
            name: 'Nick',
            password: '1111'
        },
        {
            name: 'Joe',
            password: '1111'
        },
        {
            name: 'Barney',
            password: '1111'
        }
    ];


    var user = document.getElementById('username').textContent;
    localStorage.setItem('tempUser', JSON.stringify(user));


    var logOutBtn = document.getElementById('exit');
    logOutBtn.addEventListener('click', function () {
        localStorage.setItem('tempUser', JSON.stringify(""));
        modul.setUser("Гость");
        var posts = document.getElementById('posts');
        while (posts.firstChild) {
            posts.removeChild(posts.firstChild);
        }
        modul.addAll(posts);

    });


    var signBtn = document.getElementById('reg');
    var signInModal = document.getElementById('signInModal');
    signBtn.addEventListener('click', function () {
        signInModal.style.display = 'block';
    });

    var signINBtn = document.getElementById('signIN');
    signINBtn.addEventListener('click', function () {
        var userName = document.getElementById('login').value;
        var userPassword = document.getElementById('password').value;
        var tempUser = { name: userName, password: userPassword };
        if (users.find(function (x) { return (x.name === userName && x.password === userPassword); })) {
            document.getElementById('wrongData').style.display = 'none';
            tempUser = userName;
            localStorage.setItem('tempUser', JSON.stringify(tempUser));
            signInModal.style.display = 'none';
            modul.setUser(userName);
            var posts = document.getElementById('posts');
            while (posts.firstChild) {
                posts.removeChild(posts.firstChild);
            }
            modul.addAll(posts);
        }
        else {
            document.getElementById('wrongData').style.display = 'block';
        }
    });


    var loadMoreBtn = document.getElementById('loadMore');
    loadMoreBtn.addEventListener('click', function () {
        var posts = document.getElementById('posts');
        var l = posts.childNodes.length + 10;
        var arr = JSON.parse(localStorage.getItem('posts'));
        while (posts.firstChild) {
            posts.removeChild(posts.firstChild);
        }
        var nameFilter = document.getElementById('authorFilter').value;
        var dateFilter = document.getElementById('dateFilter').value;
        var hashtagFilter = document.getElementById('hashTagFilter').value;
        var filterPost = { author: nameFilter, createdAt: dateFilter, hashTags: hashtagFilter };

        var photoPosts = list.getPage(0, l, filterPost);
        for (var i = 0; i < photoPosts.length; i++) {
            View.addPhotoPostToHtml(photoPosts[i]);
        }
        if (l >= arr.length) {
            loadMoreBtn.style.display = "none";
        }



    });


    var filterBtn = document.getElementById('full');
    filterBtn.addEventListener('click', function () {
        var nameFilter = document.getElementById('authorFilter').value;
        var dateFilter = document.getElementById('dateFilter').value;
        var hashtagFilter = document.getElementById('hashTagFilter').value;
        var filterPost = { author: nameFilter, createdAt: dateFilter, hashTags: hashtagFilter };
        var posts = document.getElementById('posts');
        var error=document.getElementById('notFound');
        var photoPosts = list.getPage(0, list._posts.length, filterPost);
        while (posts.firstChild) {
            posts.removeChild(posts.firstChild);
        }
        if(photoPosts.length===0){
            error.style.display = "initial";
            posts.appendChild(error);
            loadMoreBtn.style.display = "none";
        }
        else{
            for (var i = 0; i < photoPosts.length; i++) {
                View.addPhotoPostToHtml(photoPosts[i]);
            }
            if (photoPosts.length <= 10) {
                loadMoreBtn.style.display = "none";
            }
        }       
    });


    var closeEditBtn = document.getElementById('close');
    closeEditBtn.addEventListener('click', function () {
        editModal.style.display = 'none';
    });


    var noDeleteBtn = document.getElementById('noDelete');
    noDeleteBtn.addEventListener('click', function () {
        deleteModal.style.display = 'none';
    });

    var yesDeleteBtn = document.getElementById('yesDelete');
    yesDeleteBtn.addEventListener('click', function () {
        modul.removePost(View.idToDelete);
        deleteModal.style.display = 'none';
    });


    var edit;
    var editPhoto = document.getElementById('photoModal');
    var editDescr = document.getElementById('shortDescrModal');
    var editHashtags = document.getElementById('hashTagsModal');

    var okEditBtn = document.getElementById('okEdit');
    okEditBtn.addEventListener('click', function () {
        if (View.editOrAdd === 'edit') {
            if (editPhoto.src !== "") {
                modul.editPost(View.idToEdit, {
                    description: editDescr.value,
                    hashTags: editHashtags.value.split(','),
                    photoLink: editPhoto.src
                });
            }
            else {
                modul.editPost(View.idToEdit, {
                    description: editDescr.value,
                    hashTags: editHashtags.value.split(',')
                });
            }
            View.editOrAdd='';
        }
        if (edit === 'add') {            
            modul.addPost( {
                id: (list._posts.length + 1).toString(),
                description: editDescr.value,
                createdAt: View.formatDate(new Date()),
                author: document.getElementById('nameModal').innerText,
                photoLink: editPhoto.src,
                state: 'active',
                hashTags: editHashtags.value.split(','),
                likes: []
            }); 
            edit='';              
        }
        editModal.style.display = 'none';
    });

    var addPostBtn = document.getElementById('добавить');
    addPostBtn.addEventListener('click', function () {
        edit = 'add';
        document.getElementById('nameModal').textContent = JSON.parse(localStorage.getItem('tempUser'));
        var now = new Date();
        document.getElementById('dateModal').textContent = View.formatDate(now);
        document.getElementById('photoModal').src = "";
        document.getElementById('shortDescrModal').value = "";
        document.getElementById('hashTagsModal').value = "";
        editModal.style.display = 'block';
        editModal.style.display = 'inline-block';
    });



    var uploadBtn = document.getElementById('upload');
    var imgURL = document.getElementById('imageURL');
    uploadBtn.addEventListener('click', function () {
        document.getElementById('photoModal').src = imgURL.value;
    });




























}());