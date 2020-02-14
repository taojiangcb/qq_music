const gulp = require("gulp");
const shell = require("shelljs");
const path = require('path');

let workSpaceDir = __dirname;


gulp.task('cpbin', function () {
  let viewDir = `${workSpaceDir}/bin/**/*.*`;
  var stream = gulp.src([viewDir]);
  return stream.pipe(
    gulp.dest(`${workSpaceDir}/dist/bin/`)
  );
})

gulp.task("cpFile", function () {
  let docDir = `${workSpaceDir}/doc/*.*`;
  let packageFile = `${workSpaceDir}/package.json`;
  let yarnFile = `${workSpaceDir}/yarn.lock`;
  var stream = gulp.src([docDir, packageFile, yarnFile]);
  return stream.pipe(
    gulp.dest(`${workSpaceDir}/dist/`)
  );
});

gulp.task('build:prod', () => {
  return exec('npm run pb');
})
gulp.task('pb', gulp.series('build:prod', 'cpbin', 'cpFile'));

gulp.task('rsync:test', function () {
  let dist = path.resolve(__dirname, './bin');
  return exec(`rsync -avz --rsh=ssh ${dist}/*.* root@47.100.202.222:/opt/resource/nginx/www/qq_music_test`);
})


gulp.task('spa:build:test', () => { return exec('npm run spa:pb:test'); });
gulp.task('deploy:spa:test', gulp.series('spa:build:test', 'rsync:test'));


async function exec(cmd) {
  let t = Date.now();
  return new Promise((resolve, reject) => {
    shell.exec(cmd, (code, stdout, stderr) => {
      if (stderr) {
        console.log(stderr);
        resolve(stderr);
      }
      console.log(`执行成功:${cmd} 耗时:${Date.now() - t} 毫秒`);
      resolve(stderr);
    });
  });
}