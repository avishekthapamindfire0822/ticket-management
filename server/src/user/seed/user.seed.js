const { encryptPassword } = require('../../auth/auth.util');
const dbConfig = require('../../config/dbConfig');
const User = require('../user.model');
const userRoles = require('../user.roles');
const fs = require('fs/promises');
const path = require('path');
const users = [
  {
    id: 1,
    firstName: 'Terry',
    lastName: 'Medhurst',
    emailId: 'atuny0@sohu.com',
    password: '9uQFF1Lh',
  },
  {
    id: 2,
    firstName: 'Sheldon',
    lastName: 'Quigley',
    emailId: 'hbingley1@plala.or.jp',
    password: 'CQutx25i8r',
  },
  {
    id: 3,
    firstName: 'Terrill',
    lastName: 'Hills',
    emailId: 'rshawe2@51.la',
    password: 'OWsTbMUgFc',
  },
  {
    id: 4,
    firstName: 'Miles',
    lastName: 'Cummerata',
    emailId: 'yraigatt3@nature.com',
    password: 'sRQxjPfdS',
  },
  {
    id: 5,
    firstName: 'Mavis',
    lastName: 'Schultz',
    emailId: 'kmeus4@upenn.edu',
    password: 'aUTdmmmbH',
  },
  {
    id: 6,
    firstName: 'Alison',
    lastName: 'Reichert',
    emailId: 'jtreleven5@nhs.uk',
    password: 'zY1nE46Zm',
  },
  {
    id: 7,
    firstName: 'Oleta',
    lastName: 'Abbott',
    emailId: 'dpettegre6@columbia.edu',
    password: 'YVmhktgYVS',
  },
  {
    id: 8,
    firstName: 'Ewell',
    lastName: 'Mueller',
    emailId: 'ggude7@chron.com',
    password: 'MWwlaeWcOoF6',
  },
  {
    id: 9,
    firstName: 'Demetrius',
    lastName: 'Corkery',
    emailId: 'nloiterton8@aol.com',
    password: 'HTQxxXV9Bq4',
  },
  {
    id: 10,
    firstName: 'Eleanora',
    lastName: 'Price',
    emailId: 'umcgourty9@jalbum.net',
    password: 'i0xzpX',
  },
  {
    id: 11,
    firstName: 'Marcel',
    lastName: 'Jones',
    emailId: 'acharlota@liveinternet.ru',
    password: 'M9lbMdydMN',
  },
  {
    id: 12,
    firstName: 'Assunta',
    lastName: 'Rath',
    emailId: 'rhallawellb@dropbox.com',
    password: 'esTkitT1r',
  },
  {
    id: 13,
    firstName: 'Trace',
    lastName: 'Douglas',
    emailId: 'lgribbinc@posterous.com',
    password: 'ftGj8LZTtv9g',
  },
  {
    id: 14,
    firstName: 'Enoch',
    lastName: 'Lynch',
    emailId: 'mturleyd@tumblr.com',
    password: 'GyLnCB8gNIp',
  },
  {
    id: 15,
    firstName: 'Jeanne',
    lastName: 'Halvorson',
    emailId: 'kminchelle@qq.com',
    password: '0lelplR',
  },
  {
    id: 16,
    firstName: 'Trycia',
    lastName: 'Fadel',
    emailId: 'dpierrof@vimeo.com',
    password: 'Vru55Y4tufI4',
  },
  {
    id: 17,
    firstName: 'Bradford',
    lastName: 'Prohaska',
    emailId: 'vcholdcroftg@ucoz.com',
    password: 'mSPzYZfR',
  },
  {
    id: 18,
    firstName: 'Arely',
    lastName: 'Skiles',
    emailId: 'sberminghamh@chron.com',
    password: 'cAjfb8vg',
  },
  {
    id: 19,
    firstName: 'Gust',
    lastName: 'Purdy',
    emailId: 'bleveragei@so-net.ne.jp',
    password: 'UZGAiqPqWQHQ',
  },
  {
    id: 20,
    firstName: 'Lenna',
    lastName: 'Renner',
    emailId: 'aeatockj@psu.edu',
    password: 'szWAG6hc',
  },
];
(async function () {
  let mongoose;
  try {
    const finalUsers = await Promise.all(
      users.map(({ id, ...user }) => {
        return new Promise((resolve, reject) => {
          encryptPassword(user.password).then((encryptedPassword) => {
            resolve({
              ...user,
              password: encryptedPassword,
              role: Object.values(userRoles)[Math.floor(Math.random() * 2)],
            });
          });
        });
      })
    );
    mongoose = await dbConfig();
    await User.insertMany(finalUsers);
    await fs.writeFile(
      path.resolve(process.cwd(), 'users.txt'),
      JSON.stringify(
        users.map((user, index) => ({
          ...user,
          role: finalUsers[index].role,
        })),
        null,
        4
      )
    );
  } catch (err) {
    console.log({ err });
  } finally {
    await mongoose.disconnect();
  }
})();
