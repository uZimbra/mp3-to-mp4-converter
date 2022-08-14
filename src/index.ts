import ffmpeg from "fluent-ffmpeg";
import { readdir } from "fs";
import { join } from "path";

const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfmpegPath(ffmpegPath);

const workDir = join(__dirname, "input");

function execute() {
  readdir(workDir, (_, files) => {
    files.forEach((file) => {
      ffmpeg({ source: join(workDir, file) })
        .withNoVideo()
        .fromFormat("mp4")
        .toFormat("mp3")
        .on("error", function (err) {
          console.log("An error occurred: " + err.message);
        })
        .on("end", function () {
          console.log(`Processing of ${file} finished !`);
        })
        .saveToFile(join(__dirname, "output", file.replace("4", "3")));
    });
  });
}

execute();
