
import { Church, Profile } from "../types";

export const churches: Church[] = [
  {
    id: "1",
    name: "Grace Community Church",
    description: "A vibrant, contemporary church focused on family ministries and community outreach.",
    address: "123 Main Street, Anytown, USA",
    location: {
      latitude: 34.052235,
      longitude: -118.243683
    },
    denomination: "Non-denominational",
    denominationId: 1,
    worshipStyle: "Contemporary",
    sizeCategory: "Medium",
    emphasis: ["Family Ministry", "Community Outreach", "Youth Programs"],
    serviceFormality: "Casual",
    websiteUrl: "https://example.com/grace",
    sermonUrl: "https://example.com/grace/sermons",
    serviceTimes: {
      "Sunday": ["9:00 AM", "11:00 AM"],
      "Wednesday": ["7:00 PM"]
    },
    pastorIntro: "Pastor John Smith has been leading our church for over 10 years with a passion for practical Bible teaching.",
    images: [
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
      "https://images.unsplash.com/photo-1546404895-4e33f13d2f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
    ],
    socialMediaLinks: {
      "facebook": "https://facebook.com/gracecommunitychurch",
      "instagram": "https://instagram.com/gracechurch",
      "youtube": "https://youtube.com/gracechurchvideos"
    },
    matchPercentage: 87,
    distance: 2.3
  },
  {
    id: "2",
    name: "First Baptist Church",
    description: "A traditional Baptist church with a focus on in-depth Bible study and missions.",
    address: "456 Oak Avenue, Somewhere, USA",
    location: {
      latitude: 34.059235,
      longitude: -118.253683
    },
    denomination: "Baptist",
    denominationId: 2,
    worshipStyle: "Traditional",
    sizeCategory: "Medium",
    emphasis: ["Bible Study", "Missions", "Prayer"],
    serviceFormality: "Formal",
    websiteUrl: "https://example.com/firstbaptist",
    sermonUrl: "https://example.com/firstbaptist/sermons",
    serviceTimes: {
      "Sunday": ["10:00 AM", "6:00 PM"],
      "Wednesday": ["6:30 PM"]
    },
    pastorIntro: "Pastor Robert Johnson has served for 15 years and is known for his expository preaching style.",
    images: [
      "https://images.unsplash.com/photo-1530874394636-1abe47521622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1598886221210-d22e0b39e307?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    socialMediaLinks: {
      "facebook": "https://facebook.com/firstbaptist",
      "twitter": "https://twitter.com/firstbaptist"
    },
    matchPercentage: 72,
    distance: 3.8
  },
  {
    id: "3",
    name: "St. Mary's Cathedral",
    description: "A beautiful historic cathedral with traditional liturgical services and a rich musical tradition.",
    address: "789 Cathedral Way, Metro City, USA",
    location: {
      latitude: 34.055235,
      longitude: -118.233683
    },
    denomination: "Catholic",
    denominationId: 3,
    worshipStyle: "Liturgical",
    sizeCategory: "Large",
    emphasis: ["Liturgy", "Social Justice", "Community Service"],
    serviceFormality: "Formal",
    websiteUrl: "https://example.com/stmarys",
    serviceTimes: {
      "Sunday": ["8:00 AM", "10:30 AM", "5:00 PM"],
      "Saturday": ["5:30 PM"],
      "Monday": ["12:00 PM"],
      "Tuesday": ["12:00 PM"],
      "Wednesday": ["12:00 PM"],
      "Thursday": ["12:00 PM"],
      "Friday": ["12:00 PM"]
    },
    pastorIntro: "Father Michael Thomas leads our parish with a heart for serving the community and inspiring faith through tradition.",
    images: [
      "https://images.unsplash.com/photo-1550771515-93b89fcc8560?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1543341770-61df4f03fde2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    socialMediaLinks: {
      "facebook": "https://facebook.com/stmaryscathedral",
      "instagram": "https://instagram.com/stmaryscathedral",
      "youtube": "https://youtube.com/stmaryscathedral"
    },
    matchPercentage: 64,
    distance: 5.1
  },
  {
    id: "4",
    name: "New Life Fellowship",
    description: "A diverse, charismatic church focused on Spirit-led worship and community impact.",
    address: "101 Fellowship Lane, Anytown, USA",
    location: {
      latitude: 34.062235,
      longitude: -118.263683
    },
    denomination: "Pentecostal",
    denominationId: 4,
    worshipStyle: "Charismatic",
    sizeCategory: "Large",
    emphasis: ["Worship", "Healing", "Evangelism"],
    serviceFormality: "Mixed",
    websiteUrl: "https://example.com/newlife",
    sermonUrl: "https://example.com/newlife/messages",
    serviceTimes: {
      "Sunday": ["10:00 AM"],
      "Friday": ["7:30 PM"]
    },
    pastorIntro: "Pastor David and Lisa Chen lead our vibrant community with a focus on authentic worship and spiritual growth.",
    images: [
      "https://images.unsplash.com/photo-1493804714600-6edb1cd93080?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    socialMediaLinks: {
      "facebook": "https://facebook.com/newlifefellowship",
      "instagram": "https://instagram.com/newlifechurch",
      "youtube": "https://youtube.com/newlifevideos",
      "spotify": "https://spotify.com/newlifeworship"
    },
    matchPercentage: 91,
    distance: 1.7
  },
  {
    id: "5",
    name: "Hillside Community Chapel",
    description: "A small, intimate church with a focus on discipleship and Biblical teaching.",
    address: "202 Hillside Drive, Somewhere, USA",
    location: {
      latitude: 34.049235,
      longitude: -118.223683
    },
    denomination: "Non-denominational",
    denominationId: 1,
    worshipStyle: "Blended",
    sizeCategory: "Small",
    emphasis: ["Discipleship", "Bible Study", "Community Groups"],
    serviceFormality: "Casual",
    websiteUrl: "https://example.com/hillside",
    serviceTimes: {
      "Sunday": ["10:30 AM"],
      "Thursday": ["7:00 PM"]
    },
    pastorIntro: "Pastor Sarah Williams leads our congregation with thoughtful teaching and a heart for authentic relationships.",
    images: [
      "https://images.unsplash.com/photo-1547994770-8c114e6c2beb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1585164743050-33c46c3ddc4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    socialMediaLinks: {
      "facebook": "https://facebook.com/hillsidechapel",
      "instagram": "https://instagram.com/hillsidechapel"
    },
    matchPercentage: 78,
    distance: 4.2
  }
];

export const currentProfile: Profile = {
  id: "user123",
  name: "John Doe",
  age: 32,
  location: {
    latitude: 34.052235,
    longitude: -118.243683
  },
  preferences: {
    worshipStyle: {
      "Contemporary": 0.8,
      "Blended": 0.6,
      "Traditional": 0.3,
      "Charismatic": 0.4,
      "Liturgical": 0.2
    },
    denominationWeights: {
      "Non-denominational": 0.9,
      "Baptist": 0.5,
      "Methodist": 0.4,
      "Presbyterian": 0.4,
      "Catholic": 0.2,
      "Pentecostal": 0.4
    },
    sizePreference: "Medium",
    emphasisWeights: {
      "Bible Study": 0.8,
      "Community Outreach": 0.9,
      "Family Ministry": 0.7,
      "Worship": 0.8,
      "Discipleship": 0.6,
      "Missions": 0.5,
      "Social Justice": 0.4
    },
    serviceFormality: "Casual",
    maxDistance: 10
  }
};

export const questionnaireData: { sections: { [key: string]: any }[] } = {
  sections: [
    {
      title: "Worship Style",
      questions: [
        {
          id: "worship_preference",
          question: "What worship style do you prefer?",
          type: "multiple",
          options: ["Traditional Hymns", "Contemporary", "Blended", "Gospel", "Charismatic", "Liturgical"]
        },
        {
          id: "music_importance",
          question: "How important is music in your worship experience?",
          type: "slider",
          min: 1,
          max: 5,
          step: 1
        }
      ]
    },
    {
      title: "Denominational Preference",
      questions: [
        {
          id: "denomination_preference",
          question: "Do you have a specific denominational preference?",
          type: "multiple",
          options: ["Baptist", "Catholic", "Lutheran", "Methodist", "Presbyterian", "Pentecostal", "Non-denominational", "Interdenominational", "Open to explore"]
        }
      ]
    },
    {
      title: "Community Size",
      questions: [
        {
          id: "community_size",
          question: "What size of church community are you looking for?",
          type: "single",
          options: ["Small (<50 people)", "Medium (50-200 people)", "Large (200-1000 people)", "Megachurch (1000+ people)"]
        }
      ]
    },
    {
      title: "Theological Emphasis",
      questions: [
        {
          id: "theological_emphasis",
          question: "Which theological emphases are most important to you?",
          type: "multiple",
          options: ["Community Outreach", "In-depth Bible Study", "Family Ministries", "Social Justice", "Missions/Evangelism", "Spiritual Gifts", "Prayer", "Discipleship"]
        }
      ]
    },
    {
      title: "Service Formality",
      questions: [
        {
          id: "service_formality",
          question: "What level of formality do you prefer in a church service?",
          type: "single",
          options: ["Casual", "Formal", "Mixed"]
        }
      ]
    },
    {
      title: "Distance",
      questions: [
        {
          id: "max_distance",
          question: "What's the maximum distance you're willing to travel to attend church (in miles)?",
          type: "slider",
          min: 1,
          max: 50,
          step: 1
        }
      ]
    }
  ]
};
