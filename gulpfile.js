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