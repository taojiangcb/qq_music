
export module Model {

  export class Creator {
    avatarUrl?: string = "";
    encrypt_uin?: string = "ow6soecs7Kvlov**";
    followflag?: number = 0;
    isVip?: number = 2;
    name?: string = "Akivn";
    qq?: number = 2160865471;
    type?: number = 2;
  }

  export class Disc {
    commit_time?: string = "2020-01-15"
    createtime?: string = "2020-01-15"
    creator?: Creator = {};
    dissid?: string = "7334207738";
    dissname?: string = "伤情日音 · 丧系少女的心酸回忆";
    imgurl?: string = "http://p.qpic.cn/music_cover/bof4MDsSxjG6Va3xXJrNAI5qbDE3cllY0zQb0YaHBj8I3wa3Pxs80g/600?n=1";
    introduction?: string = "";
    listennum?: number = 41716;
    score?: number = 0;
    version?: number = 0;
  }

  export class Slider {
    linkUrl?: string = "";
    picUrl?: string = "";
    id?: number = 0;
  }

  export class Song {
    singername?: string = "马天宇";
    songname?: string = "桥边姑娘 (Live)";
  }

  export class TopInfo {
    id?: number = 4;
    listenCount?: number = 9500000;
    picUrl?: string = "http://y.gtimg.cn/music/photo_new/T003R300x300M000001xuVco3CiXd0.jpg";
    songList: Song[] = [];
    topTitle?: string = "巅峰榜·流行指数";
    type?: number = 0;
  }

  export class Preview {
    trybegin?: number = 56459;
    tryend?: number = 84621;
    trysize?: number = 960887;
  }

  export class Pay {
    payalbum?: number = 0;
    payalbumprice?: number = 0;
    paydownload?: number = 1;
    payinfo?: number = 1;
    payplay?: number = 0;
    paytrackmouth?: number = 1;
    paytrackprice?: number = 200;
    timefree?: number = 0;
  }

  export class Signer {
    id?: number = 1294564;
    mid?: string = "0041vdG63lbLge";
    name?: string = "海伦";
  }

  export class SignData {
    singer?: Signer[] = [];
    size5_1?: number = 0;
    size128?: number = 2931359;
    size320?: number = 7328081;
    sizeape?: number = 0;
    sizeflac?: number = 20665526;
    sizeogg?: number = 4495348;
    songid?: number = 244625442;
    songmid?: string = "001zLvbN1NYMuv";
    songname?: string = "桥边姑娘";
    songorig?: string = "桥边姑娘";
    songtype?: number = 0;
    strMediaMid?: string = "001zLvbN1NYMuv";
    stream?: number = 1;
    switch?: number = 17413891;
    type?: number = 0;
    vid?: string = "";
  }

  export class Sing {
    Franking_value?: string = "1";
    cur_count?: string = "1";
    data: SignData = {};
    in_count?: string = "10";
    old_count?: string = "1";
  }
}