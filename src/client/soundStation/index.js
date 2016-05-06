//imports
import m from 'mithril';
import R from 'ramda'

import {Head, Spotify, SongPreview} from '../components';
import SongCard from './components/songCard';
import { addSongToUser } from '../socket/RestRequests';
import RFID from '../rfid';
// vars
// songs
// need to add song albums to each song
let id = '';
const flag = true;


const songs = [

  {
    album:'Plans',
    name:'Soul Meets Body',
    artist:'Death Cab for Cutie',
    year:'2005',
    length:'3:49',
    description:'zoopa zoopa pizza peroggi pasta penne',
    uri:'spotify:track:5yc59J3MR3tVDPTOgwgRI5',
    img:'https://i.scdn.co/image/3e5e3d76c8f50393a6494a1c8bea1a01178a8753',
     selected: false,
    genre:'Alternative'
  },
  {
    album:'How To Dismantle An Atomic Bomb',
    name:'Vertigo',
    artist:'U2',
    year:'2004',
    length:'3:15',
    description:'zoopa zoopa pizza peroggi pasta penne',
    uri:'spotify:track:57ZXcBtCZXSg9TVV5xRdnR',
    img:'https://i.scdn.co/image/1ba80e91c966d08ba4340b4e9f21c55b064a1e21',
     selected: false,
    genre:'Rock'
  },
  {
    album:'Aftermath',
    name:'Paint It Black',
    artist:'Rolling Stones',
    year:'1966',
    length:'3:22',
    description:'zoopa zoopa pizza peroggi pasta penne',
    uri:'spotify:track:63T7DJ1AFDD6Bn8VzG6JE8',
    img:'https://i.scdn.co/image/c09585dd1713b35f8e47393d05ced6b9bcd03607',
     selected: false,
    genre: 'Rock'
  },
  {
    album:'Led Zeppelin IV',
    name:'Stairway To Heaven',
    artist:'Led Zeppelin',
    year:'1971',
    length:'7:58',
    description:'zoopa zoopa pizza peroggi pasta penne',
    uri:'spotify:track:51pQ7vY7WXzxskwloaeqyj',
    img:'https://i.scdn.co/image/c89be3d95870abb652c16deef6e3d3e5174710ff',
     selected: false,
    genre: 'Rock',
  },
  {
    album:'The Wall',
    name:'Another Brick in the Wall, Pt. 2',
    artist:'Pink Floyd',
    year:'1979',
    length:'3:59',
    description:'zoopa zoopa pizza peroggi pasta penne',
    uri:'spotify:track:4gMgiXfqyzZLMhsksGmbQV',
    img:'https://i.scdn.co/image/464f49ec36104a5939ea76cf1597a5311d91f602',
     selected: false,
    genre: 'Rock'
  },
  {
    album:'Paranoid',
    name:'Iron Man',
    artist:'Black Sabbath',
    year:'2005',
    length:'5:55',
    description:'zoopa zoopa pizza peroggi pasta penne',
    uri:'spotify:track:3IOQZRcEkplCXg6LofKqE9',
    img:'https://i.scdn.co/image/851538088475961344e79ae1022d1a0bd0bf53f5',
     selected: false,
    genre: 'Metal'
  },
  {
    album:'Metallica',
    name:'Enter Sandman',
    artist:'Metallica',
    year:'2005',
    length:'3:49',
    description:'zoopa zoopa pizza peroggi pasta penne',
    uri:'spotify:track:1hKdDCpiI9mqz1jVHRKG0E',
    img:'https://i.scdn.co/image/400dee6165a81c49b665d18637e3954213679ee8 ',
     selected: false,
    genre: 'Metal'
  },
  {
    album:'Number of the Beast',
    name:'Run to the Hills',
    artist:'Iron Maiden',
    year:'1982',
    length:'3:49',
    description:'zoopa zoopa pizza peroggi pasta penne',
    uri:'spotify:track:44AxeBXrK9LQlGjXyT2oZQ',
    img:'https://i.scdn.co/image/84747e43820bec289c0d75a3ae2af776f1897900',
     selected: false,
    genre: 'Metal'
  },
  {
    album:'99 Luftballons',
    name:'99 Luftballons',
    artist:'Nena',
    year:'1984',
    length:'3:53',
    description:'zoopa zoopa pizza peroggi pasta penne',
    uri:'spotify:track:6HA97v4wEGQ5TUClRM0XLc',
    img:'https://i.scdn.co/image/7db0e29a743c07c28aba88babc47a460c70fcea5',
   selected: false,
    genre: 'Pop'
  },
  {
    album:'Thriller',
    name:'Thriller',
    artist:'Micheal Jackson',
    year:'1982',
    length:'5:58',
    description:'zoopa zoopa pizza peroggi pasta penne',
    uri:'spotify:track:2LlQb7Uoj1kKyGhlkBf9aC',
    img:'https://i.scdn.co/image/6d1d714f4dcb306d3b3533fea400362974060d2d',
     selected: false,
    genre: 'Pop'
  },
  {
    album:'Solid Gold Hits',
    name:'Intergalactic',
    artist:'Beastie Boys',
    year:'2005',
    length:'3:30',
    description:'zoopa zoopa pizza peroggi pasta penne',
    uri:'spotify:track:7uDir35ufndq1NBOpoL3Ba',
    img:'https://i.scdn.co/image/c7c2d21c4152741210c2eede503a3dceab35b05c',
    selected: false,
    genre: 'Hip-Hop'
  },
    {
    album:'Raising Hell',
    name:"It's Tricky",
    artist:'Run D.M.C',
    year:'2005',
    length:'3:30',
    description:'zoopa zoopa pizza peroggi pasta penne',
    uri:'spotify:track:1zAfj2rXxddGb8Dhnwxue8',
    img:'https://i.scdn.co/image/e1a16b17492b091182a76b3cdb32b69232cdea09',
     selected: false,
    genre: 'Hip-Hop'
  },
  {
    album:'Nevermind',
    name:"Come As Your Are",
    artist:'Nirvana',
    year:'1991',
    length:'3:39',
    description:'zoopa zoopa pizza peroggi pasta penne',
    uri:'spotify:track:4P5KoWXOxwuobLmHXLMobV',
    img:'https://i.scdn.co/image/864bd75b46a575917d795b7a484f7f1fe43d23e9 ',
     selected: false,
    genre: 'Alternative'
  },
  {
    album:'King of Electric Blues',
    name:"Muddy Waters",
    artist:'Mannish Boy',
    year:'1997',
    length:'5:21',
    description:'zoopa zoopa pizza peroggi pasta penne',
    uri:'spotify:track:58PSYdY0GFg0LFb2PxYk4T',
    img:'https://i.scdn.co/image/058c42d38cc9f1b86a9bffb3b512cc986f6952a1',
     selected: false,
    genre: 'Blues'
  },
   {
    album:'The Graduate',
    name:"The Sound of Silence",
    artist:'Simon & Garfunkel',
    year:'1968',
    length:'3:05',
    description:'zoopa zoopa pizza peroggi pasta penne',
    uri:'spotify:track:58PSYdY0GFg0LFb2PxYk4T',
    img:'https://i.scdn.co/image/753d9208d21d332eea5673102a15266c2f08a884',
    selected: false,
    genre: 'Folk'
  },
   {
    album:'The Best of Don McLean',
    name:"American Pie",
    artist:'Don McLean',
    year:'1989',
    length:'8:36',
    description:'zoopa zoopa pizza peroggi pasta penne',
    uri:'spotify:track:2QgWuCtBpNIpl5trmKCxRf',
    img:'https://i.scdn.co/image/5abe5e81fb9858849116e1678d6e595c4ca68c34',
     selected: false,
    genre: 'Folk'
  },
   {
    album:"The Times They Are A'Changing",
    name:"The Times They Are A'Changing",
    artist:'Bob Dylan',
    year:'1964',
    length:'3:12',
    description:'zoopa zoopa pizza peroggi pasta penne',
    uri:'spotify:track:52vA3CYKZqZVdQnzRrdZt6',
    img:'https://i.scdn.co/image/0934c1a0019dd7783d514249680180b39c94100d',
     selected: false,
    genre: 'Folk'
  },
  {
    album:"The Man Who Invented Soul",
    name:"Wonderful World",
    artist:'Sam Cooke',
    year:'2000',
    length:'2:06',
    description:'zoopa zoopa pizza peroggi pasta penne',
    uri:'spotify:track:5SKXlfKfhNUyJ3GkpI0ELJ',
    img:'https://i.scdn.co/image/0400f51d1c2ff1ace99d28c12d8258e73d330b18',
     selected: false,
    genre: 'R&B/Soul'
  },
  {
    album:"Love Songs",
    name:"At Last",
    artist:'Etta James',
    year:'2006',
    length:'3:00',
    description:'zoopa zoopa pizza peroggi pasta penne',
    uri:'spotify:track:1nd9moIZkGvWoHtReFqkRY',
    img:'https://i.scdn.co/image/afe423c99a46d1ed470f3d41bc5850e1288ca771',
     selected: false,
    genre: 'R&B/Soul'
  },
  {
    album:"Ray Charles",
    name:"I've Got A Woman",
    artist:'Ray Charles',
    year:'2003',
    length:'2:51',
    description:'zoopa zoopa pizza peroggi pasta penne',
    uri:'spotify:track:2xar08Fq5xra2KKZs5Bw9j',
    img:'https://i.scdn.co/image/2ad60ab4f04de877f48ca7ae8e62618d38f0e51e',
     selected: false,
    genre:'R&B/Soul'
  },
  
];

const addSongToPlaylist = (id) =>
 cardSelect(id);

// views
const createCard = (data, id) =>
  <div id={`card-${id}`} className="song-card2">
    <SongCard
      song={data}
      cardId={id}
      addSong={addSongToPlaylist}/>
  </div>;


// View 1 - Track List
export const pageOne = {
  view: () =>
    <html style = "background-color:#222;">
    <Head />
      <body style = "background-color:black;">
      <h1 className='band-name'>Mixta Soundstation</h1>
      <a id = "check"    
      href ="/soundStation/two" config={m.route}>
           Continue
          </a>
      <div style="margin-top:100px;margin-right:150px;margin-left:150px; background-color:black;">

      <div className="card-holder" style = "float:right">
        {
          songs.map(
          (card, i) => createCard(card, i))
        }
      </div>

      </div>

          </body>



    </html>,
}

export const pageTwo = {
  view: () =>
  <html style = "background-color:#222">
    <Head />
    <body>
    <h2
    className="pg1-title"
    config={
      RFID.init((idNum) =>
        addSongToUser(idNum, R.map(R.prop('uri'), R.filter(R.propEq('selected', true), songs)))   
        )
      
    }>
    Scan Casette</h2>
    </body>
  </html>,

};

export const pageThree = {
  view: () =>
    <html style = "background-color:#222">
    <Head />
      <body>
      <h1 className = "pg1-title">Rock On!</h1>
      </body>


    </html>,
};

function moveOver(){
  location.search="/soundStation/three";
}


function cardSelect(cardnum) {
  var x = cardnum;
  songs[x].selected = !(songs[x].selected);
  console.log(songs[x].name+ ", " + songs[x].selected);
}


export default {
  pageOne,
  pageTwo,
  pageThree,
};
