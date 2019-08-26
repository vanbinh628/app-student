
export const unit = {
    _id: "0",
    avatar: "https://image.winudf.com/v2/image/YWUuc2lldW5oYW4ubmhhdGJhbl9zY3JlZW5fMF8xNTMxODc4Njg3XzAxMg/screen-0.jpg?h=355&fakeurl=1",
    rating: 4,
    name: "How to handle customer complaints",
    description: "Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.Lorem Ipsum has been the industry.",
}

export const reviewedTeacher = {
    coachComment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    yourRating: 0,
    ratingOveralExperience: 0,
}

export const teacher = {
    ...unit,
    lessonName: unit.name,
    lessonDescription: unit.description,
    dateStarted: 1555471716,
    dateEnded: 1555475316,
    stationName: "The coffee house",
    name: "Remilia",
    stationAddress: "Landmark 6, VinHome Central Park",
    coachComment: "",
    yourComment: "",
}

export const topics = [
    {
        id: 1,
        name: "How to handle customer complants",
        avatar: "https://www.beautyvietnam.vn/wp-content/uploads/2018/08/irene-red-velvet-9.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        tag: "#F&BIndustry"
    },
    {
        id: 2,
        name: "How to handle customer complants",
        avatar: "https://www.beautyvietnam.vn/wp-content/uploads/2018/08/irene-red-velvet-9.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        tag: "#F&BIndustry"
    },
    {
        id: 3,
        name: "How to handle customer complants",
        avatar: "https://www.beautyvietnam.vn/wp-content/uploads/2018/08/irene-red-velvet-9.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        tag: "#F&BIndustry"
    },
    {
        id: 4,
        name: "How to handle customer complants",
        avatar: "https://www.beautyvietnam.vn/wp-content/uploads/2018/08/irene-red-velvet-9.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        tag: "#F&BIndustry"
    },
    {
        id: 5,
        name: "How to handle customer complants",
        avatar: "https://www.beautyvietnam.vn/wp-content/uploads/2018/08/irene-red-velvet-9.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        tag: "#F&BIndustry"
    },
    {
        id: 6,
        name: "How to handle customer complants",
        avatar: "https://www.beautyvietnam.vn/wp-content/uploads/2018/08/irene-red-velvet-9.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        tag: "#F&BIndustry"
    },
    {
        id: 7,
        name: "How to handle customer complants",
        avatar: "https://www.beautyvietnam.vn/wp-content/uploads/2018/08/irene-red-velvet-9.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        tag: "#F&BIndustry"
    },
]

export const moreInfoClassData = {
    topic: {
        ...topics[0],
        dateStarted: 1555471716,
        dateEnded: 1555475316,
    },
    classInfo: {
        stationName: "Helio Coffee",
        stationAddress: "Landmark 6, VinHome Central Park",
        description: topics[0].description,
        lessonName: "Handle a range of common questions.",
    }
    ,
    teacher: {
        ...teacher,
        avatar: "https://www.beautyvietnam.vn/wp-content/uploads/2018/08/irene-red-velvet-9.jpg",
    },
    participants: [
        {
            avatar: "https://www.straitstimes.com/sites/default/files/styles/article_pictrure_780x520_/public/articles/2018/11/22/colin-kd2-22.jpg?itok=D60hB3-W&timestamp=1542874674",
            name: "Trần Văn Đạt",
            job: "Marketing Executive",
            level: "Intermediate",
        },
        {
            avatar: "https://www.straitstimes.com/sites/default/files/styles/article_pictrure_780x520_/public/articles/2018/11/22/colin-kd2-22.jpg?itok=D60hB3-W&timestamp=1542874674",
            name: "Trần Văn Đạt",
            job: "Marketing Executive",
            level: "Intermediate",
        },
        {
            avatar: "https://www.straitstimes.com/sites/default/files/styles/article_pictrure_780x520_/public/articles/2018/11/22/colin-kd2-22.jpg?itok=D60hB3-W&timestamp=1542874674",
            name: "Trần Văn Đạt",
            job: "Marketing Executive",
            level: "Intermediate",
        },
        {
            avatar: "https://www.straitstimes.com/sites/default/files/styles/article_pictrure_780x520_/public/articles/2018/11/22/colin-kd2-22.jpg?itok=D60hB3-W&timestamp=1542874674",
            name: "Trần Văn Đạt",
            job: "Marketing Executive",
            level: "Intermediate",
        },
    ],
    reviewers: [
        {
            avatar: "https://www.beautyvietnam.vn/wp-content/uploads/2018/08/irene-red-velvet-9.jpg",
            name: "Trần Văn Đạt",
            comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            rating: 4,
            nickName: "Huy Tran",
        },
        {
            avatar: "https://www.beautyvietnam.vn/wp-content/uploads/2018/08/irene-red-velvet-9.jpg",
            name: "Trần Văn Đạt",
            comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            rating: 4,
            nickName: "Huy Tran",
        },
    ],
}

export const units = [
    {
        dateStarted: 1555471716,
        dateEnded: 1555475316,
        stationName: "The coffee house",
        stationAddress: "Landmark 6, VinHome Central Park",
        teacherName: "Calle Andersson",
        status: 0,
        studentID: 0,
        lessonName: "Handle a range of common questions.",
        description: "Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.Lorem Ipsum has been the industry.",
    },
    {
        dateStarted: 1555471716,
        dateEnded: 1555475316,
        stationName: "The coffee house",
        stationAddress: "Landmark 6, VinHome Central Park",
        teacherName: "Calle Andersson",
        status: 1,
        studentID: 0,
        lessonName: "Handle a range of common questions.",
        description: "Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.Lorem Ipsum has been the industry.",
    },
    {
        dateStarted: 1555471716,
        dateEnded: 1555475316,
        stationName: "The coffee house",
        stationAddress: "Landmark 6, VinHome Central Park",
        teacherName: "Calle Andersson",
        status: 2,
        studentID: 0,
        lessonName: "Handle a range of common questions.",
        description: "Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.Lorem Ipsum has been the industry.",
    },
    {
        dateStarted: 1555471716,
        dateEnded: 1555475316,
        stationName: "The coffee house",
        stationAddress: "Landmark 6, VinHome Central Park",
        teacherName: "Calle Andersson",
        status: 0,
        studentID: 0,
        lessonName: "Handle a range of common questions.",
        description: "Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.Lorem Ipsum has been the industry.",
    },
    {
        dateStarted: 1555471716,
        dateEnded: 1555475316,
        stationName: "The coffee house",
        stationAddress: "Landmark 6, VinHome Central Park",
        teacherName: "Calle Andersson",
        status: 2,
        studentID: 0,
        lessonName: "Handle a range of common questions.",
        description: "Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.Lorem Ipsum has been the industry.",
    },
    {
        dateStarted: 1555471716,
        dateEnded: 1555475316,
        stationName: "The coffee house",
        stationAddress: "Landmark 6, VinHome Central Park",
        teacherName: "Calle Andersson",
        status: 1,
        studentID: 0,
        lessonName: "Handle a range of common questions.",
        description: "Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.Lorem Ipsum has been the industry.",
    },
]

export const listOfGroupClasses1 = [
    {
        id: 1,
        avatar: "https://i.pinimg.com/736x/f0/e5/69/f0e5693304b928f2e64ce5a31eb744ae.jpg",
        time: "10:00 - 11:00  | 13/09/2018",
        local: "The coffee house",
        name: "Coach: Calle Andersson",
        lesson: "Lesson: How to  handle customer complaints ",
        isbutton: true,
        isratestart: false,
        israte: false
    },
    {
        id: 2,
        avatar: "http://images4.fanpop.com/image/photos/18300000/Itachi-Uchiha-itachi-uchiha-18374717-1280-720.jpg",
        time: "10:00 - 11:00  | 13/09/2018",
        local: "The coffee house",
        name: "Coach: HAHAHA",
        lesson: "Lesson: How to  handle customer complaints ",
        isbutton: false,
        isratestart: false,
        israte: false
    },
]

export const listOfGroupClasses2 = [
    {
        id: 1,
        avatar: "https://i.pinimg.com/736x/f0/e5/69/f0e5693304b928f2e64ce5a31eb744ae.jpg",
        time: "10:00 - 11:00  | 13/09/2018",
        local: "The coffee house",
        name: "Coach: Calle Andersson",
        lesson: "Lesson: How to  handle customer complaints ",
        isbutton: false,
        isratestart: false,
        israte: true
    },
    {
        id: 2,
        avatar: "http://images4.fanpop.com/image/photos/18300000/Itachi-Uchiha-itachi-uchiha-18374717-1280-720.jpg",
        time: "10:00 - 11:00  | 13/09/2018",
        local: "The coffee house",
        name: "Coach: HAHAHA",
        lesson: "Lesson: How to  handle customer complaints ",
        isbutton: false,
        isratestart: true,
        isratestart: true,
        israte: false
    },
]

export const teacherList = [
    {
        "_id": "5c91bfc7d4662216ce56138a",
        "username": "demoteacher",
        "name": "demo teacher",
        "email": "demoteacher@smartr.co",
        "dob": "1970-01-01T00:00:00.000Z",
        "about": "asdfsd sdf sdfsdf",
        "phone": "123456789",
        "role": 2,
        "status": 1,
        avatar: "https://www.beautyvietnam.vn/wp-content/uploads/2018/08/irene-red-velvet-9.jpg",
        "creatorID": "5ba726ba1966b333e4a101d6",
        "plan": null,
        "level": "BEGINNER",
        "dateCreated": 1553055687121,
        "rating": 5,
        "dateUpdated": 1555573982910,
        "topicIDs": [
            "5caeffdfc350fd713f66dc2c",
            "5cb0453d06eef744e5fc9dc0"
        ]
    },
    {
        "_id": "5c91bfc7d4662216ce56138a",
        "username": "demoteacher",
        "name": "demo teacher 1",
        "email": "demoteacher@smartr.co",
        "dob": "1970-01-01T00:00:00.000Z",
        "about": "asdfsd sdf sdfsdf",
        "phone": "123456789",
        "role": 2,
        "status": 1,
        avatar: "https://i.pinimg.com/originals/6d/40/ac/6d40accdc9d67f893524c4356b0425a4.jpg",
        "creatorID": "5ba726ba1966b333e4a101d6",
        "plan": null,
        "level": "BEGINNER",
        "dateCreated": 1553055687121,
        "rating": 5,
        "dateUpdated": 1555573982910,
        "topicIDs": [
            "5caeffdfc350fd713f66dc2c",
            "5cb0453d06eef744e5fc9dc0"
        ]
    },
    {
        "_id": "5c91bfc7d4662216ce56138a",
        "username": "demoteacher",
        "name": "demo teacher 2",
        "email": "demoteacher@smartr.co",
        "dob": "1970-01-01T00:00:00.000Z",
        "about": "asdfsd sdf sdfsdf",
        "phone": "123456789",
        "role": 2,
        "status": 1,
        avatar: "https://www.beautyvietnam.vn/wp-content/uploads/2018/08/irene-red-velvet-9.jpg",
        "creatorID": "5ba726ba1966b333e4a101d6",
        "plan": null,
        "level": "BEGINNER",
        "dateCreated": 1553055687121,
        "rating": 5,
        "dateUpdated": 1555573982910,
        "topicIDs": [
            "5caeffdfc350fd713f66dc2c",
            "5cb0453d06eef744e5fc9dc0"
        ]
    },
]
