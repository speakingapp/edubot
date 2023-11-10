const { Telegraf, Markup } = require('telegraf')
const { getFirestore, doc, setDoc, collection, getDocs } = require("firebase/firestore");
const {db} = require('./users')


const bot = new Telegraf('6628569552:AAGZJ2PTYydKKZy1w1Tvv_vohSPdYAEZdj8')






// Middleware to check if the user is a member of the specified channel
bot.use(async (ctx, next) => {
  try {
    const channel = '@multilevel_speakApp';
    const chatMember = await ctx.telegram.getChatMember(channel, ctx.from.id);
    const isSubscribed = ['administrator', 'member', 'owner', 'creator'].includes(chatMember.status);

    if (isSubscribed) {
      return next(); // Continue to the next middleware
    } else {
      ctx.reply("Botdan foydalanish uchun kanalimizga obuna bo'ling", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Kanalga obuna bo'lish", url: "https://t.me/multilevel_speakApp" }],
            [{ text: "Tasdiqlash", callback_data: "verify" }]
          ]
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

bot.action('verify', (ctx)=>{
  ctx.reply('Botimizdan foydalanishingiz mumkin! /start ustiga bosing')
})

bot.start( async (ctx) => {
  ctx.reply(`Assalomu alaykum, ${ctx.message.chat.first_name}! Edumo akademiyasining ta'lim botiga xush kelibsiz! Foydalanish uchun menulardan birini tanlang`, Markup
    .keyboard([
      ['📚 Qo\'llanmalar', '🌐 Ilovamiz','Imtihon o\'tkazilish sanasi' ],
      ['Mock Testlar', '🗒 Javoblar varaqasi', '✅ Biz haqimizda']
    ])
    .oneTime()
    .resize()
    .extra()
  );

//Save db

await setDoc(doc(db, "edumo_users", `${ctx.message.chat.id}`), {
  name: `${ctx.message.chat.first_name}`,
  username: `${ctx.message.chat.username}`,
  user_id: `${ctx.message.chat.id}`,

});
  
  


});


//Imtihon formati

bot.hears('Imtihon o\'tkazilish sanasi', (ctx)=>{
  ctx.reply(`
  INGLIZ TILI
  Oktbar 
  Ro’yxatga olish: 7-oktabrgacha
  Test vaqti: 21-22-oktabr
  
  Noyabr
  Ro’yxatga olish: 11-noyabrgacha
  Test vaqti: 25-26-noyabr
  
  Dekabr
  Ro’yxatga olish: 1-dekabrgacha
  Test vaqti: 16-17-dekabr
  
  ✅ Ro’yxatdan o’tish my.gov.uz sayti orqali amalga oshiriladi
  To’lov miqdori: 445 500 so’m`)
})


//Qo'llanmalar

bot.hears('📚 Qo\'llanmalar', (ctx) => {
  ctx.reply('Quyidagilardan birini tanlang 🔝',
    Markup
    .keyboard([
      ['PET books', 'Practice books', 'Writing'],
      ['Speaking','Listening', 'Ortga 🔙']
    ])
    .oneTime()
    .resize()
    .extra()
  );
});


//Speaking

bot.hears('Speaking', (ctx)=>{
  ctx.replyWithDocument('https://firebasestorage.googleapis.com/v0/b/exam-online-384406.appspot.com/o/speaking.pdf?alt=media&token=05f63773-3b8e-47db-bb53-ac95d3b4aade', {caption:'Speaking 7.5 Vocabulary by @edumo_uz'})
})

//Writing

bot.hears('Writing', (ctx)=>{
  ctx.replyWithDocument('https://firebasestorage.googleapis.com/v0/b/exam-online-384406.appspot.com/o/Letter%20writing.pdf?alt=media&token=3ad61586-e9db-4248-af62-f29bd12d1baf', {caption:'Letter Writing by @edumo_uz'})

  ctx.replyWithDocument('https://firebasestorage.googleapis.com/v0/b/exam-online-384406.appspot.com/o/task2.pdf?alt=media&token=4321f25b-c9b0-42d1-aa19-baf7d243537d', {caption:'Task 2 by @edumo_uz'})
})


//Books

bot.hears('Practice books', (ctx)=>{
  ctx.replyWithDocument('https://firebasestorage.googleapis.com/v0/b/exam-online-384406.appspot.com/o/60%20headings.pdf?alt=media&token=82dc0a68-99c3-4c74-af4e-1ecdaa032eea')
})

//Pet
bot.hears('PET books', (ctx) => {
  var books = [
    'https://eslcafe.ru/wp-content/uploads/2017/09/Cb-papers-PET-1.pdf',
    'https://eslcafe.ru/wp-content/uploads/2017/09/Cb-papers-PET-2.pdf',
    'https://eslcafe.ru/wp-content/uploads/2017/09/Cb-papers-PET-3.pdf',
    'https://eslcafe.ru/wp-content/uploads/2017/09/Cb-papers-PET-4.pdf',
    'https://eslcafe.ru/wp-content/uploads/2017/09/Cb-papers-PET-5.pdf'
  ];

  for (var book of books) {
    ctx.replyWithDocument(book, { caption: 'PET Practice Books\n\n  @edumo_uz' });
  }
});

//Answersheet
bot.hears('🗒 Javoblar varaqasi', (ctx) => {

    ctx.replyWithDocument({source: './files/answersheet.pdf'}, {caption:'@multilevel_speakApp'});

});


//Listening

bot.hears('Listening', (ctx)=>{
  ctx.reply('Menuni tanlang 🔝', Markup
  .keyboard([
    ['Part 2', 'Part 3', 'Part 4'],
    ['Ortga 🔙']
  ])
  .oneTime()
  .resize()
  .extra())
  
})

bot.hears('Part 2', (ctx)=>{
  ctx.reply('⏳ Audiolar yuklanguncha kutib turing...')
  ctx.replyWithDocument('https://firebasestorage.googleapis.com/v0/b/exam-online-384406.appspot.com/o/Test%201%2C%20Part%202.pdf?alt=media&token=54f4afe9-1263-45ae-8cda-a13d7bfa64b4', {caption:'Test 1'})
  ctx.replyWithHTML('https://firebasestorage.googleapis.com/v0/b/exam-online-384406.appspot.com/o/Test%201%2C%20Part%202.mp3?alt=media&token=50e6c259-d1f0-4c98-94bd-4af017deadf3', {caption:'Test 1'})

  ctx.replyWithDocument('https://firebasestorage.googleapis.com/v0/b/exam-online-384406.appspot.com/o/Test%202%2C%20Part%202.pdf?alt=media&token=ec77e6fd-0ecd-4915-9d9c-736680b9488b', {caption:'Test 2'})
  ctx.replyWithHTML('https://firebasestorage.googleapis.com/v0/b/exam-online-384406.appspot.com/o/Test%202%2C%20Part%202.mp3?alt=media&token=af437e8a-f02e-4a1a-aef5-1bde9a5c341d', {caption:'Test 2'})
})


bot.hears('Part 3', (ctx)=>{
  ctx.reply('⏳ Audiolar yuklanguncha kutib turing...')
  ctx.replyWithDocument('https://firebasestorage.googleapis.com/v0/b/exam-online-384406.appspot.com/o/Test%201%2C%20Part%203.pdf?alt=media&token=f9355bc0-230a-43a1-936d-6dd7268f4336', {caption:'Test 1'})
  ctx.replyWithHTML('https://firebasestorage.googleapis.com/v0/b/exam-online-384406.appspot.com/o/Test%201%2C%20Part%203.mp3?alt=media&token=52376b11-e6d6-411e-a1d2-c6ad3dded75a', {caption:'Test 1'})

  ctx.replyWithDocument('https://firebasestorage.googleapis.com/v0/b/exam-online-384406.appspot.com/o/Test%202%2C%20Part%203.pdf?alt=media&token=1ade5400-d502-481f-867b-aeb396212620', {caption:'Test 2'})
  ctx.replyWithHTML('https://firebasestorage.googleapis.com/v0/b/exam-online-384406.appspot.com/o/Test%202%2C%20Part%203.mp3?alt=media&token=cf75ac76-be75-4e97-93eb-403aecc36d06', {caption:'Test 2'})
})

bot.hears('Part 4', (ctx) => {

  var lists=[
    'https://firebasestorage.googleapis.com/v0/b/intrepid-honor-321018.appspot.com/o/bot-assets%2FMaps%20%40edumo_uz.pdf?alt=media&token=0e674316-3396-44e4-a67b-2919fff3a2a9',
    'https://firebasestorage.googleapis.com/v0/b/intrepid-honor-321018.appspot.com/o/bot-assets%2FMap%20Answers.pdf?alt=media&token=efa6b0a5-6b28-4f45-a70b-06497a8131e0',
    'https://firebasestorage.googleapis.com/v0/b/intrepid-honor-321018.appspot.com/o/bot-assets%2FMap%20Scripts.pdf?alt=media&token=55278e28-c806-4a23-ad49-931de09336d0',
  ]

    for (var list of lists){
    ctx.replyWithDocument(list, { protect_content:true,caption: 'Map Listening\n\n  @edumo_uz' });
    }

    ctx.reply('Audiosi quyidagi manzilda 👉: https://t.me/edumo_baza/563 ')
});


//Mock tests
bot.hears('Mock Testlar', (ctx) => {
  ctx.replyWithDocument('https://firebasestorage.googleapis.com/v0/b/exam-online-384406.appspot.com/o/Mock%20testlar%2Fmock1.pdf?alt=media&token=6e829274-5add-4ae6-9497-3aa93cb751fa', {caption: 'Mock 1 book', protect_content:true});
  ctx.replyWithHTML('Mock 1 Audiosi: https://firebasestorage.googleapis.com/v0/b/exam-online-384406.appspot.com/o/Mock%20testlar%2Fmock1.mp3?alt=media&token=4293b31b-e29f-428d-889b-84d07690557b', {protect_content:true});

  ctx.replyWithDocument('https://firebasestorage.googleapis.com/v0/b/exam-online-384406.appspot.com/o/Mock%20testlar%2Fmock2.pdf?alt=media&token=a30f851e-b0a1-4ca4-9090-f739c5ac4468', {caption: 'Mock 2 book',protect_content:true});

  ctx.replyWithHTML('Mock 2 Audiosi: https://firebasestorage.googleapis.com/v0/b/exam-online-384406.appspot.com/o/Mock%20testlar%2Fmock2.mp3?alt=media&token=3101e4c6-2e5e-471f-830c-d0bd22f1c7f9', {protect_content:true});

  ctx.replyWithDocument('https://firebasestorage.googleapis.com/v0/b/exam-online-384406.appspot.com/o/Mock%20testlar%2Fmock3.pdf?alt=media&token=f53b198a-95ab-4523-8e3e-69055ef33856', {caption: 'Mock 3 book',protect_content:true});

  ctx.replyWithHTML('Mock 3 Audiosi: https://firebasestorage.googleapis.com/v0/b/exam-online-384406.appspot.com/o/Mock%20testlar%2Fmock3.mp3?alt=media&token=4333c13e-1c6e-4590-a7e8-4d28961b4252', {protect_content:true});

  ctx.replyWithDocument('https://firebasestorage.googleapis.com/v0/b/exam-online-384406.appspot.com/o/Mock%20testlar%2Fmock4.pdf?alt=media&token=201ff9fc-f361-45f1-a8c1-55e769172e9a', {caption: 'Mock 4 book',protect_content:true});

  ctx.replyWithHTML('Mock 4 Audiosi: https://firebasestorage.googleapis.com/v0/b/exam-online-384406.appspot.com/o/Mock%20testlar%2Fmock4.mp3?alt=media&token=5909bb6d-cc68-4778-ba88-e19cd940543c', {protect_content:true});

});







// Add similar actions for other menu items like 'listening', 'writing', 'speaking', and 'mock'.

bot.hears('📢 Reklama', (ctx) => ctx.reply('Tijoriy maqsadlar uchun @javlon_developer bilan bog\'laning'));
bot.hears('⤵️ Kanalimiz', (ctx) => ctx.reply('Kanalimizga ulaning: @multilevel_speakApp'));
bot.hears('🌐 Ilovamiz', (ctx) => ctx.reply(' https://play.google.com/store/apps/details?id=vercel.multiexam.app'));
bot.hears('✅ Biz haqimizda', (ctx) => ctx.reply('Ushbu bot Edumo jamoasi (@edumo_uz) tomonidan yaratilgan bo\'lib, botdan foydalanish mutlaqo bepul.\n\n 📩 Taklif va shikoyatlaringiz bo\'lsa, @javlon_developer ga yuboring '));

bot.hears('Ortga 🔙', (ctx)=>{
  ctx.reply('Menuni tanlang 🔝', Markup
  .keyboard([
    ['📚 Qo\'llanmalar', '🌐 Ilovamiz', 'Mock Testlar'],
    ['🗒 Javoblar varaqasi', '✅ Biz haqimizda']
  ])
  .oneTime()
  .resize()
  .extra())
})

bot.launch();
