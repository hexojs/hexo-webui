var types = {
  'directory': 'Folder',
  'image/png': 'PNG image',
  'image/jepg': 'JPEG image',
  'image/bmp': 'Bitmap image',
  'image/tiff': 'TIFF image',
  'text/plain': 'Text',
  'text/css': 'Stylesheet',
  'text/x-markdown': 'Markdown',
  'application/javascript': 'JavaScript',
  'text/html': 'HTML',
  'application/x-bzip': 'Archive',
  'application/zip': 'Archive',
  'application/x-rar-compressed': 'Archive',
  'application/x-7z-compressed': 'Archive',
  'audio/mpeg': 'MPEG audio',
  'audio/mp4': 'AAC audio',
  'audio/ogg': 'OGG audio',
  'aydui/x-wav': 'WAV audio',
  'video/3gpp': '3GP video',
  'video/mp4': 'MP4 video',
  'video/ogg': 'OGV video',
  'video/quicktime': 'MOV video',
  'video/webm': 'WEBM video',
  'video/x-flv': 'FLV video',
  'video/x-matroska': 'MKV video'
};

angular.module('hexo').filter('filetype', function(){
  return function(input){
    if (!input) return;

    return types[input] || 'File';
  }
});