class MyPlugin {
    apply(compiler) {
      compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {
        // Explore each chunk (build output):
        compilation.chunks.forEach(chunk => {
          // Explore each module within the chunk (built inputs):
          chunk.getModules().forEach(module => {
            // Explore each source file path that was included into the module:
            module.buildInfo && module.buildInfo.fileDependencies && module.buildInfo.fileDependencies.forEach(filepath => {
              // we've learned a lot about the source structure now...
            });
          });
  
          // Explore each asset filename generated by the chunk:
          chunk.files.forEach(filename => {
            // Get the asset source for each file generated by the chunk:
            var source = compilation.assets[filename].source();
            var tmp = { ...compilation.assets[filename] };
            console.log(JSON.stringify(tmp, null, 2));
          });
        });
  
        callback();
      });
    }
  }
  module.exports = MyPlugin;