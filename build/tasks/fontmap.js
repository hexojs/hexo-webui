var rVar = /\$fa-var-(.+?): "(.+?)";/;

module.exports = function(grunt){
  grunt.registerTask('fontmap', function(){
    var options = this.options(),
      str = grunt.file.read(options.src),
      vars = {},
      result = ['// Variables'];

    str.split('\n').forEach(function(line){
      if (!rVar.test(line)) return;

      var match = line.match(rVar),
        name = match[1],
        value = match[2];

      vars[name] = value;
    });

    for (var i in vars){
      result.push('fa-var-' + i + ' = "' + vars[i] + '"');
    }

    result.push('');
    result.push('// Extends');

    for (var i in vars){
      result.push([
        '$fa-icon-' + i,
        '  &:before',
        '    content: fa-var-' + i
      ].join('\n'));
    }

    grunt.file.write(options.dest, result.join('\n'));
  });
};