// DB structure

let trainingDBDocumnent1 = {
    id: 1,
    userId: 1,
    name:"Тренировка 1",
    dates: {
        "lastTrainingDate": "date in UNIX (832493253243)"
    },
    exercises: [
        11111,22222
    ]
}

let trainingDBDocumnent2 = {
    id: 2,
    userId: 1,
    name:"Тренировка 2",
    dates: {
        "lastTrainingDate": "date in UNIX (832493253243)"
    },
    exercises: [
        11111,33333
    ]
}

let exerciseDBDocumnent1 = {
    id: "11111",
    userId: 1,
    exerciseName: "Упражнение 1",
}

let exerciseDBDocumnent2 = {
    id: "22222",
    parentId: 2,
    userId: 1,
    exerciseName: "Упражнение 2"
}

let exerciseDBDocumnent3 = {
    id: "33333",
    userId: 1,
    exerciseName: "Упражнение 3"
}

let historyDBDocumnent1 = {
    id: "h1",
    exerciseID: "11111",
    date: 123213213213213,
    podhods: [
        {
            weight: 70,
            count: 10
        },
        {
            weight: 70,
            count: 10
        },
        {
            weight: 70,
            count: 10
        },
        {
            weight: 80,
            count: 7
        }
    ]
}

let historyDBDocumnent2 = {
    id: "h2",
    exerciseID: "11111",
    date: 123213213213213,
    podhods: [
        {
            weight: 70,
            count: 10
        },
        {
            weight: 70,
            count: 10
        },
        {
            weight: 70,
            count: 10
        },
        {
            weight: 80,
            count: 7
        }
    ]
}

let historyDBDocumnent3 = {
    id: "h3",
    exerciseID: "11111",
    date: 123213213213213,
    podhods: [
        {
            weight: 70,
            count: 10
        },
        {
            weight: 70,
            count: 10
        },
        {
            weight: 70,
            count: 10
        },
        {
            weight: 80,
            count: 7
        }
    ]
}

let historyDBDocumnent4 = {
    id: "h4",
    exerciseID: "11111",
    date: 123213213213213,
    podhods: [
        {
            weight: 70,
            count: 10
        },
        {
            weight: 70,
            count: 10
        },
        {
            weight: 70,
            count: 10
        },
        {
            weight: 80,
            count: 7
        }
    ]
}

let historyDBDocumnent5 = {
    id: "h5",
    exerciseID: "22222",
    date: 123213213213213,
    podhods: [
        {
            weight: 70,
            count: 10
        },
        {
            weight: 70,
            count: 10
        },
        {
            weight: 70,
            count: 10
        },
        {
            weight: 80,
            count: 7
        }
    ]
}

let historyDBDocumnent6 = {
    id: "h6",
    exerciseID: "22222",
    date: 123213213213213,
    podhods: [
        {
            weight: 70,
            count: 10
        },
        {
            weight: 70,
            count: 10
        },
        {
            weight: 70,
            count: 10
        },
        {
            weight: 80,
            count: 7
        }
    ]
}

let historyDBDocumnent7 = {
    id: "h7",
    exerciseID: "33333",
    date: 123213213213213,
    podhods: [
        {
            weight: 70,
            count: 10
        },
        {
            weight: 70,
            count: 10
        },
        {
            weight: 70,
            count: 10
        },
        {
            weight: 80,
            count: 7
        }
    ]
}

let historyDBDocumnent8 = {
    id: "h8",
    exerciseID: "33333",
    date: 123213213213213,
    podhods: [
        {
            weight: 70,
            count: 10
        },
        {
            weight: 70,
            count: 10
        },
        {
            weight: 70,
            count: 10
        },
        {
            weight: 80,
            count: 7
        }
    ]
}


// get history by Training1
// select * from history where exerciseId in (select exercises from training where ID = 1)
// return h1,h2,h5,h6


// get history by exercise1
// select * from history where exerciseId = 11111
// return h1,h2,h3,h4


// request structure

// trainings get by userId
// return
let getTrainings = [
    {
        id: 1,
        name:"Тренировка 1",
        dates: {
            "lastTrainingDate": "date in UNIX (832493253243)"
        },
        exercises: [
            {
                id: "11111",
                exerciseName: "Упражнение 1"
            },
            {
                id: "22222",
                exerciseName: "Упражнение 2"
            }
        ]
    },
    {
        id: 2,
        name:"Тренировка 2",
        dates: {
            "lastTrainingDate": "date in UNIX (832493253243)"
        },
        exercises: [
            {
                id: "33333",
                exerciseName: "Упражнение 3"
            },
            {
                id: "44444",
                exerciseName: "Упражнение 4"
            }
        ]
    }
]

// trainings post
// insert
let postTraining = {
    id: 1,
    userId: 1,
    name:"Тренировка 1",
    dates: {
        "lastTrainingDate": "date in UNIX (832493253243)"
    },
    exercises: [
        {
            id: "11111",
            exerciseName: "Упражнение 1"
        },
        {
            id: "22222",
            exerciseName: "Упражнение 2"
        }
    ]
}


// trainings put
// insert
let putTraining = {
    id: 1,
    userId: 1,
    name:"Тренировка 1",
    dates: {
        "lastTrainingDate": "date in UNIX (832493253243)"
    },
    exercises: [
        {
            id: "11111",
            exerciseName: "Упражнение 1"
        },
        {
            id: "22222",
            exerciseName: "Упражнение 2"
        }
    ]
}


{id: 1}
// trainings delete
// delete from trainings where ID = 1




// exercises get
// return
[
    {
        id: "11111",
        exerciseName: "Упражнение 1"
    },
    {
        id: "22222",
        exerciseName: "Упражнение 2"
    }
]

// exercises post, put
var exercise = {
    id: "11111",
    userid: 1,
    exerciseName: "Упражнение 1"
}
// insert into exercises exercise



// exercises post, put
var exercise = {
    parentId: 2,
    userid: 1,
}

// var default = select defaultExercise by parentId

var default = {
    userid: 1,
    exerciseName: "parentName",

}

// insert into exercises default

// exercises delete
//

{id: 1}

// delete from exercises where id = 1
// delete from history where ExerciseId = 1



// history get
var request = {
    ids: [
        1,2,3
    ],
    dateStart: 2213213213213,
    dateEnd: 2121321321321
}

//select * from history where exerciseId in (1,2,3) and date >= dateStart and date <= dateEnd
//return [ h1, h2, h3]


// history post, put
var request1 = {
    exerciseID: 1,
    date: 2324214324324,
    podhods: [
        {
            weight: 70,
            count: 10
        },
        {
            weight: 70,
            count: 10
        },
        {
            weight: 70,
            count: 10
        },
        {
            weight: 80,
            count: 7
        }
    ]
}

// insert into history request1


// historyDelete
{id: 1}
// delete from history where id = 1