const express = require("express");
const router = express.Router();
const Posts = require("../data/db.js");




router.get('/', (req, res) => {
    //Database methods return a promise(then and catch)
    const query = req.query // holds the query string
    Posts.find(query) // pass the query string to the database library
    .then(response => {
        res.status(200).json(response)
    })
.catch(err => {
    console.log(err)
    res.status(500).json({ err: "The posts info could not be retreived"})
})

})

router.get("/:id", (req, res) => {
    Posts.findById(req.params.id)
    .then(response=> {
        if(response) {
            res.status(200).json(response)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist"})
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: "The post information could not be retreived"})
    })
})

router.post("/", (req,res) => {
    const post = req.body;

    if(!post.title || !post.contents) {
res.status(400).json({errorMessage: "Please provide title and contents for the post"})
    }
    else{
        Posts.insert(post).then(response=>{
            res.status(201).json({ id: response.id, ...post})
        })
        .catch(error => {
            res.status(500).json({ error : "There was an error while saving the post to the database"})
        })
    }
})

router.post("/:id/comments", (req, res) => {
    Posts.findById(req.params.id).then(posts => {
        if(!posts || posts.length ===0) {
            res.status(404).json ({message: "The post with the specified ID does not exist"})
        } else {
            const newComment = req.body;
            if (!newComment.text) {
                res.status(400).json({ errorMessage: "Please provide text for the comment"})
            } else{
                console.log(posts)
                console.log(`post.id ${posts[0].id} `)
                newComment.post_id = posts[0].id
            }
        }

    })
})


router.delete("/:id", (req, res) => {
    Posts.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "The posts has been deleted" });
            } else {
                res.status(404).json({ message: "The posts could not be found" });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: "Error removing the posts",
            });
        });
});


router.put("/:id", (req,res) => {
    const post = req.body;
    Posts.update(req.params.id, post)
    .then(post=> {
        if (post){
            res.status(200).json({ message: "Your Post has been updated"})
        } else{
            res.status(404).json({ message: "The post could not be found"})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: "Error updating the post"
        })
    })
})


// router.put("/:id", (req, res) => {
//     const changes = req.body;
//     Hubs.update(req.params.id, changes)
//         .then(hub => {
//             if (hub) {
//                 res.status(200).json(hub);
//             } else {
//                 res.status(404).json({ message: "The hub could not be found" });
//             }
//         })
//         .catch(error => {
//             // log error to database
//             console.log(error);
//             res.status(500).json({
//                 message: "Error updating the hub",
//             });
//         });
// });


// // /api/hubs/
// router.get("/", (req, res) => {
//     Hubs.find(req.query)
//         .then(hubs => {
//             res.status(200).json(hubs);
//         })
//         .catch(error => {
//             // log error to database
//             console.log(error);
//             res.status(500).json({
//                 message: "Error retrieving the hubs",
//             });
//         });
// });

// // /api/hubs/:id
// router.get("/:id", (req, res) => {
//     Hubs.findById(req.params.id)
//         .then(hub => {
//             if (hub) {
//                 res.status(200).json(hub);
//             } else {
//                 res.status(404).json({ message: "Hub not found" });
//             }
//         })
//         .catch(error => {
//             // log error to database
//             console.log(error);
//             res.status(500).json({
//                 message: "Error retrieving the hub",
//             });
//         });
// });

// router.post("/", (req, res) => {
//     Hubs.add(req.body)
//         .then(hub => {
//             res.status(201).json(hub);
//         })
//         .catch(error => {
//             // log error to database
//             console.log(error);
//             res.status(500).json({
//                 message: "Error adding the hub",
//             });
//         });
// });

// router.delete("/:id", (req, res) => {
//     Hubs.remove(req.params.id)
//         .then(count => {
//             if (count > 0) {
//                 res.status(200).json({ message: "The hub has been nuked" });
//             } else {
//                 res.status(404).json({ message: "The hub could not be found" });
//             }
//         })
//         .catch(error => {
//             // log error to database
//             console.log(error);
//             res.status(500).json({
//                 message: "Error removing the hub",
//             });
//         });
// });



// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

// export default router; // ES2015 modules
module.exports = router;
