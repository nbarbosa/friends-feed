var app = require('./app');
var User = require('./models/user');


function addFriends(friendship) {

    for (var i = 0; i < friendship.length; i++) {
        var fromEmail = friendship[i].from;
        var toEmails = friendship[i].to;
        for (var j = 0; j < toEmails.length; j++) {
            var killProcess = false;

            // last friend, should exit
            if (i == friendship.length -1 && j == toEmails.length - 1) {
                killProcess = true;
            }

            var toEmail = toEmails[j];
            friend(fromEmail, toEmail, killProcess);

        }
    }

}

function friend(emailUserA, emailUserB, killProcess) {
    User.findOne({email: emailUserA}, function(err, userA) {
        if (err) {
          console.log(err);
          
        }
        if (userA !== null) {

            User.findOne({email: emailUserB}, function(err, userB) {
                if (err) {
                  console.log(err);
                }

                if (userB !== null) {
                    userA.friends.push(userB);
                    userB.friends.push(userA);
                    userA.save(function () {
                        userB.save(function () { 
                            if (killProcess === true) {
                                process.exit();
                            }
                        });
                    });
                } else {
                }
            });
        } else {
        }
    });
}

User.create([
    {
        name: {
            first: 'John',
            last: 'Doe'
        },
        photo: { url: '/media/mario.jpg' },
        email: 'john.doe@gmail.com',
        friends: []
    },
    {
        name: {
            first: 'Peter',
            last: 'Johnson'
        },
        photo: { url: '/media/trooper.jpg' },
        email: 'pjohnson@gmail.com',
        friends: []
    },
    { 
        name: {
            first: 'Jessica',
            last: 'Kind' 
        },
        photo: { url: '/media/woman.jpg'},
        email: 'jkind@live.com',
        friends: []
    }]
, function() { 

    // John is friends with Peter and Jessica
    // Note that Jessica is not friends with Peter
    var friendship = [
        {
            from: 'john.doe@gmail.com',
            to: [
                'pjohnson@gmail.com',
                'jkind@live.com'
            ]
        }
    ];

    addFriends(friendship);
});

