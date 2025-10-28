const express = require('express');
const router = express.Router();

router.get('/magazine', (req, res) => {
    res.json({
        left: [
            {
                img: '/IMAGE/IMG1.jpg',
                title: 'Startup Culture Boom in Asia',
                desc: 'Young entrepreneurs are taking over...'
            },
            {
                img: '/IMAGE/IMG7.jpg',
                title: 'Remote Work Revolution',
                desc: 'Companies are embracing remote-first culture...'
            },
            {
                img: '/IMAGE/IMG8.jpg',
                title: 'Tech in Rural India',
                desc: 'Affordable internet is changing lives in villages...'
            },
            {
                img: '/IMAGE/IMG9.jpg',
                title: 'Green Energy Innovations',
                desc: 'Solar and wind energy projects are transforming the power sector across the globe.'
            },
        ],
        center: {
            main: {
                img: '/IMAGE/IMG2.jpg',
                title: 'The Future of AI & Human Interaction',
                desc: 'AI is not replacing humans but collaborating to create smarter, more efficient solutions.'
            },
            bottom: {
                img: '/IMAGE/IMG3.jpg',
                caption: 'AI‑powered visual analytics capturing the world in real time.'
            }
        },
        right: [
            {
                img: '/IMAGE/IMG4.jpg',
                title: 'Tech Investment 2025',
                desc: 'Investors eye emerging startups in cloud infrastructure.'
            },
            {
                img: '/IMAGE/IMG5.jpg',
                title: 'UX Trends Changing',
                desc: 'Minimalism & accessibility are reshaping product design.'
            },
            {
                img: '/IMAGE/IMG6.jpg',
                title: 'App Launch: SmartPay',
                desc: 'A new wallet experience by TechCore hits one‑million users.'
            },
            {
                img: '/IMAGE/IMG4.jpg',
                title: 'Tech Investment 2025',
                desc: 'Investors eye emerging startups in cloud infrastructure.'
            },
            {
                img: '/IMAGE/IMG5.jpg',
                title: 'UX Trends Changing',
                desc: 'Minimalism & accessibility are reshaping product design.'
            },
            {
                img: '/IMAGE/IMG6.jpg',
                title: 'App Launch: SmartPay',
                desc: 'A new wallet experience by TechCore hits one‑million users.'
            },
            {
                img: '/IMAGE/IMG7.jpg',
                title: 'Cybersecurity Advances',
                desc: 'New AI-driven tools are enhancing threat detection and prevention.'
            },
            {
                img: '/IMAGE/IMG8.jpg',
                title: 'Cloud Computing Growth',
                desc: 'Enterprises are migrating faster to cloud platforms for scalability.'
            },
            {
                img: '/IMAGE/IMG9.jpg',
                title: 'Quantum Computing Breakthrough',
                desc: 'Researchers achieve new milestones in quantum processing power.'
            },
            {
                img: '/IMAGE/IMG4.jpg',
                title: '5G Expansion',
                desc: 'Faster and wider 5G networks are changing connectivity worldwide.'
            },
            {
                img: '/IMAGE/IMG2.jpg',
                title: 'Green Tech Innovations',
                desc: 'Sustainable technologies are transforming energy consumption.'
            }
        ]
    });
});
///SPORT///
router.get('/sports', (req, res) => {
    res.json({
        left: [
            {
                img: '/IMAGE/sports1.jpg',
                title: 'Cricket World Cup Highlights',
                desc: 'Thrilling matches and outstanding performances from the latest tournament.'
            },
            {
                img: '/IMAGE/sports2.jpg',
                title: 'Football Transfer Updates',
                desc: 'Top clubs are making big moves in the transfer market this season.'
            }
        ],
        center: {
            main: {
                img: '/IMAGE/sports3.jpg',
                title: 'Olympics 2024 Preview',
                desc: 'Athletes gear up for the biggest sporting event of the year.'
            },
            bottom: {
                img: '/IMAGE/sports4.jpg',
                caption: 'Record-breaking moments expected in track and field events.'
            }
        },
        right: [
            {
                img: '/IMAGE/sports5.jpg',
                title: 'Tennis Grand Slam Results',
                desc: 'Highlights from the latest tennis championships.'
            },
            {
                img: '/IMAGE/sports6.jpg',
                title: 'Basketball Season Kickoff',
                desc: 'Exciting games and new talents to watch out for.'
            },
            {
                img: '/IMAGE/sports7.jpg',
                title: 'Marathon Training Tips',
                desc: 'How to prepare for your next big race.'
            }, {
                img: '/IMAGE/sports8.jpg',
                title: 'Tennis Grand Slam Results',
                desc: 'Highlights from the latest tennis championships.'
            }
        ],
        horizontal: [
            {
                img: '/IMAGE/sports9.jpg',
                title: 'Cricket World Cup 2024',
                desc: 'India dominates the tournament with thrilling performances.'
            },
            {
                img: '/IMAGE/sports10.jpg',
                title: 'Football Transfer Window',
                desc: 'Top European clubs chase young talents this season.'
            },
            {
                img: '/IMAGE/sports11.jpg',
                title: 'Olympics Countdown',
                desc: 'Excitement builds as athletes train for Paris 2024.'
            },
            {
                img: '/IMAGE/sports12.jpg',
                title: 'NBA Season Highlights',
                desc: 'Star players shine in season openers and set new records.'
            },
            {
                img: '/IMAGE/sports13.jpg',
                title: 'Wimbledon Finals',
                desc: 'New champions crowned in epic tennis showdown.'
            }
        ],
    });
});
////POLITICS//
router.get('/politics', (req, res) => {
    const politicsData = [
        {
            img: '/IMAGE/politics1.jpg',
            title: 'Election 2024: Intense Campaigning Begins',
            desc: 'Political parties ramp up their campaigns nationwide, focusing on key battleground states.',
            time: '1 min ago'
        },
        {
            img: '/IMAGE/politics2.jpg',
            title: 'New Policy Reforms Announced',
            desc: 'Government unveils major reforms in education and healthcare aiming to boost social welfare.',
            time: '2 hours ago'
        },
        {
            img: '/IMAGE/politics3.jpg',
            title: 'International Relations: Summit Highlights',
            desc: 'Leaders discuss trade, climate change, and security in the annual global summit.',
            time: 'Yesterday'
        },
        {
            img: '/IMAGE/politics4.jpg',
            title: 'Youth Voter Engagement on the Rise',
            desc: 'Social media campaigns and grassroots movements energize young voters ahead of elections.',
            time: '3 days ago'
        },
        {
            img: '/IMAGE/politics5.jpg',
            title: 'Economic Outlook Amid Political Shifts',
            desc: 'Experts analyze how recent political developments might impact the national economy.',
            time: 'Last week'
        },
        {
            img: '/IMAGE/politics6.jpg',
            title: 'Coalition Talks Reach Final Stage',
            desc: 'Rival parties negotiate key cabinet positions as they race to form a new government.',
            time: 'Today'
        }
    ];
    res.json(politicsData);
});

/* ---------- EVENTS ROUTE ---------- */
router.get('/events', (req, res) => {
  res.json([
    {
      img: '/IMAGE/event1.avif',
      date: '05 Aug 2024',
      title: 'Global Climate Summit 2024',
      desc: 'World leaders discuss critical measures to combat climate change.'
    },
    {
      img: '/IMAGE/event1.avif',
      date: '10 Sep 2024',
      title: 'Tech Expo 2024 – Silicon Valley',
      desc: 'Showcasing the latest breakthroughs in AI, VR and green‑tech.'
    },
    {
      img: '/IMAGE/event2.avif',
      date: '22 Oct 2024',
      title: 'National Startup Pitch Day',
      desc: 'Early‑stage founders present innovative ideas to top investors.'
    },
    {
      img: '/IMAGE/event3.avif',
      date: '14 Nov 2024',
      title: 'Green Energy Forum',
      desc: 'Roadmaps revealed for achieving net‑zero targets by 2035.'
    },
    {
      img: '/IMAGE/event4.avif',
      date: '02 Dec 2024',
      title: 'Annual Developer Conference',
      desc: 'Hands‑on workshops covering cloud‑native, edge and AI tooling.'
    },
    {
      img: '/IMAGE/event5.avif',
      date: '18 Jan 2024',
      title: 'Marathon for Charity',
      desc: '10 k run organised to raise funds for children’s education.'
    }
  ]);
});
//////// ABOUT PAGE ////////
router.get('/about', (req, res) => {
    res.json({
        teamImage: "/IMAGE/about bg.jpg",
        articles: [
            {
                title: "Music Events",
                subtitle: "Live in Concert",
                img: "/IMAGE/about img1.jpg"
            }
        ],
        description: `The refractor telescope uses a convex lens to focus light through the eyepiece. The reflector telescope uses concave mirrors to focus the image you see. 
Collimation is how well your telescope is aligned. Good collimation means a clear, accurate image of celestial bodies.
Aperture refers to the size of the telescope’s lens or mirror. It’s a key factor in how powerful your telescope is—more important than magnification.
The focuser holds the eyepiece steady and must be stable to ensure a reliable view.
Mount and wedge are parts of the tripod setup. The mount is the tripod itself, and the wedge is the device attaching the telescope to the mount.`
    });
});

router.get('/mission-vision', (req, res) => {
    res.json({
        mission: {
            title: "Our Mission",
            content: "At TechStreet, our mission is to empower businesses through innovative technology solutions. We strive to deliver cutting-edge software, websites, and digital tools that solve real problems, enhance user experience, and drive measurable results."
        },
        vision: {
            title: "Our Vision",
            content: "Our vision is to become a globally trusted technology partner. We aim to lead the digital transformation journey and shape the future of IT solutions with integrity, creativity, and excellence."
        }
    });
});
router.get('/section', (req, res) => {
    res.json({
        image: "/IMAGE/about img2.jpg", // your image path
        title: "Our Best Services",
        content: `Quality You Can Trust-

At our core, we believe in delivering quality without compromise. Every detail matters, and we ensure that excellence is built into everything we do from concept to execution.

Driven by Passion, Focused on Results
We are driven by passion and guided by purpose. Our team works with dedication to create meaningful solutions that not only meet expectations but exceed them.

We prioritize client satisfaction, innovative thinking, and top-tier results.`,

        buttonText: "Read More",
        buttonLink: "about.html"
    });
});
////menber ///
const teamData = [
    {
        name: "Priyanshu Sharma",
        role: "Project Manager",
        image: "/IMAGE/abhay.jpg",
        description: "Priya brings 7+ years of experience in managing diverse tech projects with a focus on agile methodologies and team collaboration."
    },
    {
        name: "Rahul Verma",
        role: "Lead Developer",
        image: "/IMAGE/Hemant-Jain--Lokmat.jpg",
        description: "Rahul is a full-stack developer skilled in JavaScript, Node.js, and React, driving innovative solutions and mentoring junior developers."
    },
    {
        name: "Anjali Mehta",
        role: "UI/UX Designer",
        image: "/IMAGE/megha.jpg",
        description: "Anjali crafts intuitive and engaging user experiences, combining creativity with user-centered design principles."
    },
    {
        name: "Suresh Kumar",
        role: "Backend Engineer",
        image: "/IMAGE/girish.png",
        description: "Suresh specializes in scalable backend architectures, database optimization, and API development using modern technologies."
    },
    {
        name: "Neha Singh",
        role: "Quality Assurance Lead",
        image: "/IMAGE/Ritu-Kapur--Quint.png",
        description: "Neha ensures product quality through rigorous testing, automation frameworks, and continuous integration processes."
    },
    {
        name: "Vikram Joshi",
        role: "DevOps Engineer",
        image: "/IMAGE/gopal.jpg",
        description: "Vikram manages deployment pipelines, cloud infrastructure, and system reliability for seamless production environments."
    }
];
///// contact page api///
router.get('/contact', (req, res) => {
    res.json({

        heading: "Get in Touch",
        subheading: "We’re here to help and answer any question you might have.",
        email: "support@techstreet.com",
        phone: "+91 9876543210",
        address: "2nd Floor, TechStreet Solutions, Sector 63, Noida, UP - 201301"
    });
});
router.get('/team', (req, res) => {
    res.json(teamData);
});
///media//
const mediaHeroIntro = {
    heroImage: "/IMAGE/media bg.avif",
    overlayText: "Media",
    introTitle: "Media Overview",
    introParagraphs: [
        "The world of media is evolving rapidly, encompassing television, digital platforms, social media, and cinema. Each medium holds its own influence on society. Media is not just a source of entertainment but also a powerful tool to deliver truth and awareness.",
        "In today’s digital age, media impacts every aspect of life and continues to shape opinions, culture, and communication on a global scale. Whether it’s television in rural homes or social media in urban youth, media defines how we think, speak, and react.",
        "Media has become an integral part of our daily lives, shaping how we consume information, entertainment, and connect with the world."
    ],
    introRightImage: "/IMAGE/media img2.webp"
};
router.get('/media-hero-intro', (req, res) => {
    res.json(mediaHeroIntro);
});
const televisionNews = {
    featured: {
        image: "/IMAGE/television1.webp",
        title: "JioStar ramps its regional sports portfolio ahead of IPL",
        author: "Anita Mehra",
        date: "July 11, 2025"
    },
    secondary: {
        image: "/IMAGE/television2.webp",
        category: "Entertainment",
        title: "DistroTV enters key partnership with IN10 Media Network",
        author: "Rohan Das",
        date: "July 11, 2025"
    },
    cards: [
        {
            category: "Drama",
            title: "Glance comes onboard as Bigg Boss' official smart lock screen partner",
            author: "Neha Rathi",
            date: "July 11, 2025",
            image: "/IMAGE/television3.webp"
        },
        {
            category: "News",
            title: "Anupam Mittal responds to Shark Tank- delayed funding allegations",
            author: "Ajay Tiwari",
            date: "July 11, 2025",
            image: "/IMAGE/television4.webp"
        },
        {
            category: "Talk Shows",
            title: "Senior journalist  is Mr.Ravish Kumar quits in a NDTV",
            author: "Ritika Shah",
            date: "July 11, 2025",
            image: "/IMAGE/television5.webp"
        }
    ]
};
router.get("/television-news", (req, res) => {
    res.json(televisionNews);
});
// digital //
const digitalNews = {
    left: [
        { category: "FASHION", title: "Search engines can now index public content from Instagram", author: "Guy Hawkins", date: "January 16, 2024", image: "/IMAGE/digital.webp" },
        { category: "LIFESTYLE", title: "Google unveils new AI tools to support marketers at Google Marketing Live India", author: "Guy Hawkins", date: "January 16, 2024", image: "/IMAGE/digital2.webp" }
    ],
    center: [{
        category: "TECHNOLOGY",
        title: "How Bollywood made it to US ballot boxes with the Zohran Mamdani campaign.",
        author: "Weir Doe",
        date: "January 16, 2024",
        image: "https://plus.unsplash.com/premium_photo-1680176131324-34ce1965a1f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGFzc2VtYmx5JTIwZ292ZXJtZW50fGVufDB8fDB8fHww",
        description: "There are many variations of passages of Lorem Ipsum available..."
    }

    ],
    right: [
        { category: "LIFESTYLE", title: "Hashtags to be removed from ads on X, says Elon Musk", author: "Guy Hawkins", date: "January 16, 2024", image: "/IMAGE/digital5.webp" },
        { category: "MODERN", title: "Meta unveils next-gen AI tools for advertisers and agencies", author: "Guy Hawkins", date: "January 16, 2024", image: "/IMAGE/digital6.webp" }
    ]
};
router.get('/digital-news', (req, res) => {
    res.json(digitalNews);
});
// social //
const socialNews = [
    {
        category: "Travel",
        title: "Fake weddings are India’s newest craze—and people are paying to attend",
        author: "Weir Doe",
        date: "January 16, 2024",
        shares: 16,
        image: "/IMAGE/social1.webp"
    },
    {
        category: "Fashion",
        title: "LinkedIn expands video ad program - BrandLink, includes creators and publishers",
        author: "Eric Widget",
        date: "January 16, 2024",
        image: "/IMAGE/social2.webp"
    },
    {
        category: "Modern",
        title: "Kapiva seeks influencer marketing agency with regional creator expertise",
        author: "Alan Fresko",
        date: "January 16, 2024",
        image: "/IMAGE/social3.webp"
    },
    {
        category: "Popular",
        title: "PTI offers creators 'highly affordable access' to its videos",
        author: "John Sticks",
        date: "January 16, 2024",
        image: "/IMAGE/social4.webp"
    },
    {
        category: "Trending",
        title: "ChatGPT's new tool turns pics into anime art, raises copyright alarms.",
        author: "Ashley Graham",
        date: "January 16, 2024",
        image: "/IMAGE/social5.webp"
    }
];
router.get('/social-news', (req, res) => {
    res.json(socialNews);
});

module.exports = router;
