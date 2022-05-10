import {Document} from "mongoose"
export const aboutData = {
    desc_en:`Skype is for connecting with the people that matter most in your life and work. It's built for both one-on-one and group conversations and works wherever you are – via mobile, PC, Xbox and Alexa. Skype messaging and HD voice and video calling will help you share experiences and get things done with others.With Skype, you can have meetings and create great things with your workgroup, share a story or celebrate a birthday with friends and family, and learn a new skill or hobby with a teacher. It’s free to use Skype – to send messages and have audio and video calls with groups of up to 100 people!If you pay a little, you can do more things, in more ways, with more people – like call phones or SMS messages. You can pay as you go or buy a subscription, whatever works for you.Try Skype out today and start adding your friends, family and colleagues. They won’t be hard to find; hundreds of millions of people are already using Skype to do all sorts of things together.`,
    desc_ru:`Skype предназначен для связи с людьми, которые имеют наибольшее значение в вашей жизни и работе. Он создан как для индивидуальных, так и для групповых бесед и работает, где бы вы ни находились, — на мобильных устройствах, ПК, Xbox и Alexa . Обмен сообщениями в Skype , а также голосовые и видеозвонки в формате HD помогут вам поделиться опытом и добиться успеха с другими.С помощью Skype вы можете проводить встречи и создавать отличные вещи со своей рабочей группой, делиться историями или отмечать день рождения с друзьями и семьей, а также изучать новый навык или хобби с учителем. Skype можно использовать бесплатно — отправлять сообщения и проводить аудио- и видеозвонки с группами до 100 человек !Если вы заплатите немного , вы сможете делать больше вещей, разными способами и с большим количеством людей — например, звонить по телефону или отправлять SMS-сообщения . Вы можете платить по мере использования или купить подписку, что вам подходит.Попробуйте Skype уже сегодня и начните добавлять друзей, родственников и коллег. Их нетрудно найти; сотни миллионов людей уже используют Skype для совместной работы.`,
    desc_uz:`Skype hayotingizda va ishingizda eng muhim odamlar bilan bog'lanish uchun mo'ljallangan. U yakkama-yakka va guruhli suhbatlar uchun yaratilgan va qayerda boʻlsangiz ham – mobil, kompyuter, Xbox va Alexa orqali ishlaydi . Skype xabar almashish va HD ovozli va video qo'ng'iroqlar boshqalar bilan tajriba almashish va ishlarni bajarishga yordam beradi.Skype yordamida siz uchrashuvlar o'tkazishingiz va ishchi guruhingiz bilan ajoyib narsalarni yaratishingiz, hikoyangizni baham ko'rishingiz yoki do'stlaringiz va oilangiz bilan tug'ilgan kuningizni nishonlashingiz, o'qituvchi bilan yangi mahorat yoki sevimli mashg'ulotni o'rganishingiz mumkin. Skype-dan foydalanish bepul - 100 kishigacha bo'lgan guruhlar bilan xabarlar yuborish va audio va video qo'ng'iroqlarni amalga oshirish uchun !Agar siz ozgina to'lasangiz , ko'proq odamlar bilan ko'proq narsalarni qilishingiz mumkin, masalan, qo'ng'iroqlar yoki SMS xabarlar . Siz xohlaganingizcha to'lashingiz yoki obuna sotib olishingiz mumkin, nima sizga mos keladi.Bugun Skype-ni sinab ko'ring va do'stlaringiz, oilangiz va hamkasblaringizni qo'shishni boshlang. Ularni topish qiyin bo'lmaydi; yuz millionlab odamlar allaqachon Skype-dan birgalikda har xil narsalarni qilish uchun foydalanmoqda.`
}

export const userData = {
    fullname:"Sapayev Alibek",
    email:"a@gmail.com",
    password:"123456789",
    img:null,
    role: "admin"
}

export const teacherData = (id:Document["_id"]) => {
    return [
        {
            fullname:"Sapayev Shoxnazar",
            title:"Magistr",
            educationTitle:"oqituvchi",
            birthdate:"08-18-2002",
            passportSeries:"AA",
            passportNumber:"1234567",
            email:"sapayev.nazaber@gmail.com",
            image:null,
            is_MA:false,
            study_foreign:false,
            departmentId:id,
            dateOfEntry:"01-01-2021"
        },
        {
            fullname:"Sapayev Shoxnazar2",
            title:"Magistr",
            educationTitle:"oqituvchi",
            birthdate:"08-18-2000",
            passportSeries:"AA",
            passportNumber:"1234568",
            email:"sapayev.nazaber2@gmail.com",
            image:null,
            is_MA:false,
            study_foreign:false,
            departmentId:id,
            dateOfEntry:"01-01-2021"
        }
    ]
}

export const newsData = [
    {
        title_uz:"Qora rieltorning beshta belgisi",
        title_ru:"Пять признаков «черного» риэлтора",
        title_en:"Five signs of a black realtor",
        short_desc_ru:"Риэлторский бизнес, где ставки весьма высоки, всегда привлекает мошенников, главная цель которых завладеть вашими деньгами или квартирой (по статистике, покупателей обманывают чаще, чем продавцов). В качестве «черного» риэлтора может выступать один человек или агентство недвижимости.",
        short_desc_en:"The real estate business, where the stakes are very high, always attracts scammers whose main goal is to take possession of your money or apartment (according to statistics, buyers are deceived more often than sellers). ",
        short_desc_uz:"Daromadlar juda yuqori bo'lgan ko'chmas mulk biznesi har doim asosiy maqsadi sizning pulingiz yoki kvartirangizni egallab olish bo'lgan firibgarlarni o'ziga jalb qiladi (statistik ma'lumotlarga ko'ra, xaridorlar sotuvchilarga qaraganda tez-tez aldanib qolishadi). ",
        desc_uz:"Daromadlar juda yuqori bo'lgan ko'chmas mulk biznesi har doim asosiy maqsadi sizning pulingiz yoki kvartirangizni egallab olish bo'lgan firibgarlarni o'ziga jalb qiladi (statistik ma'lumotlarga ko'ra, xaridorlar sotuvchilarga qaraganda tez-tez aldanib qolishadi). Bir kishi yoki rieltorlik agentligi qora rieltor sifatida harakat qilishi mumkin. Asosiysi, ularning barcha faoliyati yolg'onga asoslangan. Belgilangan tarmoqlarga tushib qolmaslik uchun siz quyida keltirilgan firibgarlik sxemalaridan xabardor bo'lishingiz kerak. Agar sizning oldingizda yolg'onchi bo'lmasangiz, u isterikada jang qilishni boshlamaydi va sizni shubhada ayblamaydi, aksincha, shubhalarni yo'q qilishga yordam beradi.",
        desc_en:"The real estate business, where the stakes are very high, always attracts scammers whose main goal is to take possession of your money or apartment (according to statistics, buyers are deceived more often than sellers). One person or a real estate agency can act as a black realtor. The main thing is that all their activities are based on deception. In order not to fall into the set networks, you should be aware of the fraudulent schemes listed below. If you are not a deceiver in front of you, he will not start to fight in hysterics and accuse you of suspicion, but on the contrary will help dispel doubts",
        desc_ru:"Риэлторский бизнес, где ставки весьма высоки, всегда привлекает мошенников, главная цель которых завладеть вашими деньгами или квартирой (по статистике, покупателей обманывают чаще, чем продавцов). В качестве «черного» риэлтора может выступать один человек или агентство недвижимости. Главное, что вся их деятельность построена на обмане. Чтобы не попасться в расставленные сети, следует знать о мошеннических схемах, указанных ниже. Если перед вами не обманщик, он не начнет биться в истерике и обвинять вас в подозрительности, а наоборот поможет развеять сомнения.",
        date:"18-08-2022"
    }
]

export const mainInfosData = {
    email:"natioanl@gmail.com",
    phoneNumber:"+998912345678",
    address_uz:"O‘zbekiston, Toshkent sh., Chilonzor tumani, 1-kvartal, 4-uy",
    address_ru:"Узбекистан, Ташкент, Чиланзарский район, 1-й квартал, 4",
    address_en:"Uzbekistan, Tashkent, Chilanzar district, 1st quarter, 4",
    coordinate_x:"41.315281",
    coordinate_y:"69.289192",
    facebook:"https://www.facebook.com/latvijasuniversitate",
    instagram:null,
    telegram:"https://t.me/tuit_online",
    youtube:"https://www.youtube.com/channel/UC62RfVrE7-JfA8JFBMO3WUA",
    startWork:"09-00",
    endWork:"18-00"
}


export const resourceCategoryDatas = [
    {
        name_uz:"Qonunlar",
        name_ru:"Законы",
        name_en:"Laws"
    },
    {
        name_uz:"Online resurslar",
        name_ru:"Интернет-ресурсы",
        name_en:"Online resources"
    }
]

export const resourceData = (id:Document["_id"]) => {
    return [
        {
            title_uz:"O‘zbekiston Respublikasi axborot texnologiyalari va kommunikatsiyalarini rivojlantirish vazirligi Muhammad al-Xorazmiy nomidagi Toshkent axborot texnologiyalari universiteti nizomi",
            title_ru:"Узбекистон Республикаси ахборот технологиилари ва коммуникацииларини риводжлантириш вазирлиги Мухаммад ал-Хоразмий номидаги Тошкент ахборот технологиилари университети низоми",
            title_en:"Regulations of the Tashkent University of Information Technologies named after Muhammad al-Khwarizmi of the Ministry of Information Technologies and Communications of the Republic of Uzbekistan",
            desc_uz:"Ushbu Nizom O‘zbekiston Respublikasining 1997 yil 29 avgustda qabul qilingan «Ta’lim to‘g‘risida»gi va «Kadrlar tayyorlash milliy dasturi to‘g‘risida»gi Qonunlariga, O‘zbekiston Respublikasi Prezidentining 2002 yil 30 maydagi « Kompyuterlashtirishni yanada rivojlantirish va axborot-kommunikatsiya texnologiyalarini joriy etish to‘g‘risida»gi PF-3080-son Farmoniga, Vazirlar Mahkamasining 2002 yil 6 iyundagi «Kompyuterlashtirishni yanada rivojlantirish va axborot-kommutatsiya texnologiyalarini joriy etish chora- tadbirlari to‘g‘risida»gi 200-soni Qaroriga, 2002 yil 7 noyabrdagi «Toshkent axborot texnologiyalari universiteti faoliyatini tashkil etish to‘g‘risida»gi 385-son qaroriga hamda ushbu qaror ijrosini ta’minlash maqsadida O‘zbekiston aloqa va axborotlashtirish agentligining 2002 yil 18 noyabrdagi 156 -son buyrug‘i, O‘zbekiston Respublikasi Prezidentining 2005 yil 2 iyundagi «Axborot texnologiyalari sohasida kadrlar tayerlash tizimini takomillashtirish to‘g‘risida»gi PQ-91-soni qarorida belgilangan talablariga muvofiq holda ishlab chiqilgan.",
            desc_ru:'Настоящее Положение основано на Законах Республики Узбекистан «Об образовании» и «О Национальной программе обучения», принятых 29 августа 1997 года, Постановлении Президента Республики Узбекистан «О дальнейшей информатизации» Кабинета Министров Республики Узбекистан. Республики Узбекистан от 6 июня 2002 года № ПФ-3080 «О мерах по дальнейшему развитию информатизации и внедрению информационно-коммуникационных технологий» Постановление № 385 от 7 ноября 2002 года «Об организации Ташкентского университета информационных технологий » и Приказ № 156 от 18 ноября 2002 года Узбекского агентства связи и информатизации Постановление Президента Республики Узбекистан № ПП-91 от 2 июня 2005 года «О совершенствовании системы подготовки кадров в области информатизации технологии" разработан в соответствии с требованиями, изложенными в ida.',
            desc_en:"This Regulation is based on the Laws of the Republic of Uzbekistan 'On Education' and 'On the National Training Program' adopted on August 29, 1997, the President of the Republic of Uzbekistan 'On further computerization' Decree of the Cabinet of Ministers of the Republic of Uzbekistan dated June 6, 2002 No. PF-3080 'On measures for further development of computerization and introduction of information and communication technologies' Resolution No. 385 of November 7, 2002 'On the organization of the Tashkent University of Information Technologies' and Order No. 156 of November 18, 2002 of the Uzbek Agency for Communications and Information Resolution of the President of the Republic of Uzbekistan No. PP-91 of June 2, 2005 'On improving the system of training in the field of information technology'` developed in accordance with the requirements set out in ida.",
            categoryId:id
        }
    ]
}


export const subjectsData = [
    {
        name_uz:"ELEKTRON TIJORAT",
        name_en:"E-commerce",
        name_ru:"Электронная коммерция"
    },
    {
        name_uz:"Buxgalteriya hisobi",
        name_en:"Accounting",
        name_ru:"Бухгалтерский учет"
    }
]


export const contestDatas = [
    {
        title_uz:`O‘z sohasida katta yutuqlarga erishgan tengdoshlaringiz bilan suhbatlashishni hohlarmidingiz?`,
        desc_uz:`❓Qanday qilib yosh bo'lishga qaramasdan yetuk dasturchi bo'lish va muvaffaqiyatlari kaliti nimadaligi haqida gaplashamiz🧑‍💻 Shu kungacha Muhammadkarim Toxtaboyev 200 dan ortiq shogirdlar chiqargan va O’zbekistonda o‘z sohasida birinchi yirik qo’llanmani ishlab chiqqan va Muhtaram Prezidentimiz Shavkat Mirziyoyev 2 ta loyihalarini ko’rib, unga fikr bildirganlar.`,
        title_ru:`Хотели бы вы поговорить со своими коллегами, которые добились больших успехов в своей области?`,
        desc_ru:`❓Поговорим о том, как быть хорошим программистом, каким бы молодым он ни был, и в чем залог успеха 🧑‍💻 На сегодняшний день Мухаммадкарим Тохтабоев выпустил более 200 студентов и разработал первое серьезное пособие в своей области в Узбекистане, и наш Президент Шавкат Мирзиёев увидел два его проекта и прокомментировал их.`,
        title_en:`Would you like to talk to your peers who have made great strides in their field?`,
        desc_en:`❓Let's talk about how to be a good programmer, no matter how young, and what is the key to success 🧑‍💻 To date, Muhammadkarim Tokhtaboyev has graduated more than 200 students and developed the first major manual in his field in Uzbekistan, and our President Shavkat Mirziyoyev saw two of his projects and commented on them.`,
        img:"src/public/uploads/0d4efecb600a7de9d1cb6f66768a52ef.jpeg",
        date:`04-10-2022`
    }
]

export const departmentDatas = [
    {
        name_uz:`KOMPYUTER INJINIRINGI`,
        name_ru:`КОМПЬЮТЕРНЫЙ ИНЖИНИРИНГ`,
        name_en:`COMPUTER ENGINEERING`,
        dean:null,
        desc_uz:`Kompyuter injiniringi fakulteti 2013 yil 26 martdagi O‘zbekiston Respublikasi Prezidentining №PQ-1942 “Axborot-kommunikatsiya texnologiyalari sohasida kadrlar tayyorlash tizimini yanada takomillashtirish chora-tadbirlari to‘g‘risida”gi Qarori asosida “Axborot texnologiyalari” fakulteti negizida tashkil topgan. Xozirgi kunda fakultetda 80 dan ortiq professor-o‘qituvchilar faoliyat olib borishadi.Fakultetda 5330500 – “Kompyuter injiniringi (“Kompyuter injiniringi”, “AT-servisi”, “Axborot xavfsizligi”, “Multimedia texnologiyalari”)” yo‘nalishi bo‘yicha bakalavriatura va 5A33501 – “Kompyuter injiniringi (“Kompyuter tizimlarini loyihalash”, “Amaliy dasturiy vositalarni loyihalash”, “Axborot va multimedia texnologiyalari”, “Axborot xavfsizligi, kriptografiya va kriptoanaliz”)” xamda 5A330502 – “Elektron xukumat tizimini boshqarish” mutaxasisliklari bo‘yicha magistratura talabalari tahsil olishadi.`,
        desc_ru:`Факультет «Компьютерный инжиниринг» создан на основе Постановления Президента Республики Узбекистан №ПП-1942 «О мерах по дальнейшему совершенствованию системы подготовки кадров в области информационно-коммуникационных технологий» от 26 марта 2013 года на базе факультета «Информационные технологии». В данное время на факультете работают более 80 профессоров и преподавателей. В факультете обучаются студенты по направлению бакалавриатуры 5330500 – «Компьютерный инжиниринг («Компьютерный инжиниринг», «ИТ-сервис», «Информационная безопасность», «Мультимедийные технологии») и по специальностям магистратуры 5А330501- «Компьютерный инжиниринг («Проектирование компьютерных систем», «Проектирование прикладных программных средств», «Информационные и мультимедийные технологии», «Информационная безопасность, криптография и криптоанализ»), и 5А330502 – «Управление системы электронного правительства».`,
        desc_en:`The Faculty of Computer Engineering was established on the basis of the Decree of the President of the Republic of Uzbekistan No. PP-1942 “On measures to further improve the system of training in the field of information and communication technologies” dated March 26, 2013 on the basis of the Faculty of Information Technologies. At present, more than 80 professors and teachers work at the faculty.The faculty trains students in the direction of bachelor's degree 5330500 - "Computer engineering" ("Computer engineering", "IT service", "Information security", "Multimedia technologies") and in the specialties of the master's program 5A330501-"Computer engineering" ("Design of computer systems", "Design of applied software", "Information and multimedia technologies", "Information security, cryptography and cryptanalysis"), and 5A330502 - "Management of the e-government system".`,
        address_uz:`B bino 110-xona`,
        address_ru:`Корпус Б 110 комнат`,
        address_en:`B building 110-room`,
    }
]

export const departmentSubjectData = (subjectId:Document["_id"],departmentId:Document["_id"]) => {
    return [
        {
            subjectId,
            departmentId,
            degree:"master"
        },
        {
            subjectId,
            departmentId,
            degree:"bachelor"
        },
        {
            subjectId,
            departmentId,
            degree:"doctoral"
        }
    ]
}

export const majorDatas = [
    {
        name_uz:"Axborot texnologiyalari",
        name_ru:"Информационные технологии",
        name_en:"Information Technology"
    },
    {
        name_uz:"Informatika asoslari",
        name_ru:"Информатика ",
        name_en:"Computer science"
    },
    {
        name_uz:"Kompyuter tizimlari",
        name_ru:"Компьютерные системы ",
        name_en:"Computer systems"
    },
]


export const departmentMajorsData = (majorId:Document["_id"],departmentId:Document["_id"])=>{
    return [
        {
            majorId,
            departmentId,
            degree:"bachelor",
            code:`12345`
        },
        {
            majorId,
            departmentId,
            degree:"master",
            code:"12346"
        },
        {
            majorId,
            departmentId,
            degree:"doctoral",
            code:"12347"
        },
    ]
}

export const adminstrationDatas = (teacherId:Document["_id"],departmentId:Document["_id"]) =>{ 
    return [
        {
            teacherId,
            departmentId,
            reception_time_starts:"09-00",
            reception_time_ends:"18-00"   
        }
    ]
}

// export const talentedStudentsData = [
//     {
//         fullname:"Sapayev Shoxnazar",
//         title:"Magistr",
//         educationTitle:"oqituvchi",
//         birthdate:"08-18-2002",
//         passportSeries:"AA",
//         passportNumber:"1234567",
//         email:"sapayev.nazaber@gmail.com",
//         image:null,
//         is_MA:false,
//         study_foreign:false,
//         departmentId:null,
//         dateOfEntry:"01-01-2021"
//     }
// ]