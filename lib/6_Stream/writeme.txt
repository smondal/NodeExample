I am sure you know about config.autoload_paths. A setting which allows you to add aditional directories (besides app/* which works out of box) that can be used for placing your .rb files. The documentation mentions a config.autoload_paths += %W(#{config.root}/extras) example. But the most common way to use it is probably to add lib directory (especially after the transition from rails 2 to rails 3).

Another (maybe not that common) usecase is to have some components (such as notification_center for example) in top-level directory. To make it possible for them to work with your app people are usually using:

config.autoload_paths += %W( #{config.root}/notification_center )
or

config.autoload_paths += %W( #{config.root}/notification_center/lib )
And it is all cool except for one thing they might have forgotten to mention to you. How it all works in production and what you can do to make it work better.

Example

Let’s say we have two files

# root/extras/foo.rb
autoClose <Boolean>
start <Integer>
end <Integer>
Returns a new ReadStream object. (See Readable Stream).

Be aware that, unlike the default value set for highWaterMark on a readable stream (16 kb), the stream returned by this method has a default value of 64 kb for the same parameter.

options is an object or string with the following defaults:

{
  flags: 'r',
  encoding: null,
  fd: null,
  mode: 0o666,
  autoClose: true
}
options can include start and end values to read a range of bytes from the file instead of the entire file. Both start and end are inclusive and start counting at 0. If fd is specified and start is omitted or undefined, fs.createReadStream() reads sequentially from the current file position. The encoding can be any one of those accepted by Buffer.

If fd is specified, ReadStream will ignore the path argument and will use the specified file descriptor. This means that no 'open' event will be emitted. Note that fd should be blocking; non-blocking fds should be passed to net.Socket.

If autoClose is false, then the file descriptor won't be closed, even if there's an error. It is your responsibility to close it and make sure there's no file descriptor leak. If autoClose is set to true (default behavior), on error or end the file descriptor will be closed automatically.

mode sets the file mode (permission and sticky bits), but only if the file was created.

An example to read the last 10 bytes of a file which is 100 bytes long:

fs.createReadStream('sample.txt', {start: 90, end: 99});
If options is a string, then it specifies the encoding.

fs.createWriteStream(path[, options])#
Added in: v0.1.31
path <String> | <Buffer>
options <String> | <Object>
flags <String>
defaultEncoding <String>
fd <Integer>
mode <Integer>
autoClose <Boolean>
start <Integer>
Returns a new WriteStream object. (See Writable Stream).

options is an object or string with the following defaults:

{
  flags: 'w',
  defaultEncoding: 'utf8',
  fd: null,
  mode: 0o666,
  autoClose: true
}
options may also include a start option to allow writing data at some position past the beginning of the file. Modifying a file rather than replacing it may require a flags mode of r+ rather than the default mode w. The defaultEncoding can be any one of those accepted by Buffer.

If autoClose is set to true (default behavior) on error or end the file descriptor will be closed automatically. If autoClose is false, then the file descriptor won't be closed, even if there's an error. It is your responsibility to close it and make sure there's no file descriptor leak.

Like ReadStream, if fd is specified, WriteStream will ignore the path argument and will use the specified file descriptor. This means that no 'open' event will be emitted. Note that fd should be blocking; non-blocking fds should be passed to net.Socket.

If options is a string, then it specifies the encoding.

fs.exists(path, callback)#
Added in: v0.0.2 Deprecated since: v1.0.0
Stability: 0 - Deprecated: Use fs.stat() or fs.access() instead.
path <String> | <Buffer>
callback <Function>
Test whether or not the given path exists by checking with the file system. Then call the callback argument with either true or false. Example:

fs.exists('/etc/passwd', (exists) => {
  console.log(exists ? 'it\'s there' : 'no passwd!');
});
Note that the parameter to this callback is not consistent with other Node.js callbacks. Normally, the first parameter to a Node.js callback is an err parameter, optionally followed by other parameters. The fs.exists() callback has only one boolean parameter. This is one reason fs.access() is recommended instead of fs.exists().

Using fs.exists() to check for the existence of a file before calling fs.open(), fs.readFile() or fs.writeFile() is not recommended. Doing so introduces a race condition, since other processes may change the file's state between the two calls. Instead, user code should open/read/write the file directly and handle the error raised if the file does not exist.

For example:

write (NOT RECOMMENDED)

fs.exists('myfile', (exists) => {
  if (exists) {
    console.error('myfile already exists');
  } else {
    fs.open('myfile', 'wx', (err, fd) => {
      if (err) throw err;
      writeMyData(fd);
    });
  }
});
write (RECOMMENDED)

fs.open('myfile', 'wx', (err, fd) => {
  if (err) {
    if (err.code === "EEXIST") {
      console.error('myfile already exists');
      return;
    } else {
      throw err;
    }
  }
  writeMyData(fd);
});
read (NOT RECOMMENDED)

fs.exists('myfile', (exists) => {
  if (exists) {
    fs.open('myfile', 'r', (err, fd) => {
      readMyData(fd);
    });
  } else {
    console.error('myfile does not exist');
  }
});
read (RECOMMENDED)

fs.open('myfile', 'r', (err, fd) => {
  if (err) {
    if (err.code === "ENOENT") {
      console.error('myfile does not exist');
      return;
    } else {
      throw err;
    }
  } else {
    readMyData(fd);
  }
});
The "not recommended" examples above check for existence and then use the file; the "recommended" examples are better because they use the file directly and handle the error, if any.

In general, check for the existence of a file only if the file won’t be used directly, for example when its existence is a signal from another process.

fs.existsSync(path)#
Added in: v0.1.21
path <String> | <Buffer>
Synchronous version of fs.exists(). Returns true if the file exists, false otherwise.

Note that fs.exists() is deprecated, but fs.existsSync() is not. (The callback parameter to fs.exists() accepts parameters that are inconsistent with other Node.js callbacks. fs.existsSync() does not use a callback.)

fs.fchmod(fd, mode, callback)#
Added in: v0.4.7
fd <Integer>
mode <Integer>
callback <Function>
Asynchronous fchmod(2). No arguments other than a possible exception are given to the completion callback.

fs.fchmodSync(fd, mode)#
Added in: v0.4.7
fd <Integer>
mode <Integer>
Synchronous fchmod(2). Returns undefined.


autoClose <Boolean>
start <Integer>
end <Integer>
Returns a new ReadStream object. (See Readable Stream).

Be aware that, unlike the default value set for highWaterMark on a readable stream (16 kb), the stream returned by this method has a default value of 64 kb for the same parameter.

options is an object or string with the following defaults:

{
  flags: 'r',
  encoding: null,
  fd: null,
  mode: 0o666,
  autoClose: true
}
options can include start and end values to read a range of bytes from the file instead of the entire file. Both start and end are inclusive and start counting at 0. If fd is specified and start is omitted or undefined, fs.createReadStream() reads sequentially from the current file position. The encoding can be any one of those accepted by Buffer.

If fd is specified, ReadStream will ignore the path argument and will use the specified file descriptor. This means that no 'open' event will be emitted. Note that fd should be blocking; non-blocking fds should be passed to net.Socket.

If autoClose is false, then the file descriptor won't be closed, even if there's an error. It is your responsibility to close it and make sure there's no file descriptor leak. If autoClose is set to true (default behavior), on error or end the file descriptor will be closed automatically.

mode sets the file mode (permission and sticky bits), but only if the file was created.

An example to read the last 10 bytes of a file which is 100 bytes long:

fs.createReadStream('sample.txt', {start: 90, end: 99});
If options is a string, then it specifies the encoding.

fs.createWriteStream(path[, options])#
Added in: v0.1.31
path <String> | <Buffer>
options <String> | <Object>
flags <String>
defaultEncoding <String>
fd <Integer>
mode <Integer>
autoClose <Boolean>
start <Integer>
Returns a new WriteStream object. (See Writable Stream).

options is an object or string with the following defaults:

{
  flags: 'w',
  defaultEncoding: 'utf8',
  fd: null,
  mode: 0o666,
  autoClose: true
}
options may also include a start option to allow writing data at some position past the beginning of the file. Modifying a file rather than replacing it may require a flags mode of r+ rather than the default mode w. The defaultEncoding can be any one of those accepted by Buffer.

If autoClose is set to true (default behavior) on error or end the file descriptor will be closed automatically. If autoClose is false, then the file descriptor won't be closed, even if there's an error. It is your responsibility to close it and make sure there's no file descriptor leak.

Like ReadStream, if fd is specified, WriteStream will ignore the path argument and will use the specified file descriptor. This means that no 'open' event will be emitted. Note that fd should be blocking; non-blocking fds should be passed to net.Socket.

If options is a string, then it specifies the encoding.

fs.exists(path, callback)#
Added in: v0.0.2 Deprecated since: v1.0.0
Stability: 0 - Deprecated: Use fs.stat() or fs.access() instead.
path <String> | <Buffer>
callback <Function>
Test whether or not the given path exists by checking with the file system. Then call the callback argument with either true or false. Example:

fs.exists('/etc/passwd', (exists) => {
  console.log(exists ? 'it\'s there' : 'no passwd!');
});
Note that the parameter to this callback is not consistent with other Node.js callbacks. Normally, the first parameter to a Node.js callback is an err parameter, optionally followed by other parameters. The fs.exists() callback has only one boolean parameter. This is one reason fs.access() is recommended instead of fs.exists().

Using fs.exists() to check for the existence of a file before calling fs.open(), fs.readFile() or fs.writeFile() is not recommended. Doing so introduces a race condition, since other processes may change the file's state between the two calls. Instead, user code should open/read/write the file directly and handle the error raised if the file does not exist.

For example:

write (NOT RECOMMENDED)

fs.exists('myfile', (exists) => {
  if (exists) {
    console.error('myfile already exists');
  } else {
    fs.open('myfile', 'wx', (err, fd) => {
      if (err) throw err;
      writeMyData(fd);
    });
  }
});
write (RECOMMENDED)

fs.open('myfile', 'wx', (err, fd) => {
  if (err) {
    if (err.code === "EEXIST") {
      console.error('myfile already exists');
      return;
    } else {
      throw err;
    }
  }
  writeMyData(fd);
});
read (NOT RECOMMENDED)

fs.exists('myfile', (exists) => {
  if (exists) {
    fs.open('myfile', 'r', (err, fd) => {
      readMyData(fd);
    });
  } else {
    console.error('myfile does not exist');
  }
});
read (RECOMMENDED)

fs.open('myfile', 'r', (err, fd) => {
  if (err) {
    if (err.code === "ENOENT") {
      console.error('myfile does not exist');
      return;
    } else {
      throw err;
    }
  } else {
    readMyData(fd);
  }
});
The "not recommended" examples above check for existence and then use the file; the "recommended" examples are better because they use the file directly and handle the error, if any.

In general, check for the existence of a file only if the file won’t be used directly, for example when its existence is a signal from another process.

fs.existsSync(path)#
Added in: v0.1.21
path <String> | <Buffer>
Synchronous version of fs.exists(). Returns true if the file exists, false otherwise.

Note that fs.exists() is deprecated, but fs.existsSync() is not. (The callback parameter to fs.exists() accepts parameters that are inconsistent with other Node.js callbacks. fs.existsSync() does not use a callback.)

fs.fchmod(fd, mode, callback)#
Added in: v0.4.7
fd <Integer>
mode <Integer>
callback <Function>
Asynchronous fchmod(2). No arguments other than a possible exception are given to the completion callback.

fs.fchmodSync(fd, mode)#
Added in: v0.4.7
fd <Integer>
mode <Integer>
Synchronous fchmod(2). Returns undefined.


autoClose <Boolean>
start <Integer>
end <Integer>
Returns a new ReadStream object. (See Readable Stream).

Be aware that, unlike the default value set for highWaterMark on a readable stream (16 kb), the stream returned by this method has a default value of 64 kb for the same parameter.

options is an object or string with the following defaults:

{
  flags: 'r',
  encoding: null,
  fd: null,
  mode: 0o666,
  autoClose: true
}
options can include start and end values to read a range of bytes from the file instead of the entire file. Both start and end are inclusive and start counting at 0. If fd is specified and start is omitted or undefined, fs.createReadStream() reads sequentially from the current file position. The encoding can be any one of those accepted by Buffer.

If fd is specified, ReadStream will ignore the path argument and will use the specified file descriptor. This means that no 'open' event will be emitted. Note that fd should be blocking; non-blocking fds should be passed to net.Socket.

If autoClose is false, then the file descriptor won't be closed, even if there's an error. It is your responsibility to close it and make sure there's no file descriptor leak. If autoClose is set to true (default behavior), on error or end the file descriptor will be closed automatically.

mode sets the file mode (permission and sticky bits), but only if the file was created.

An example to read the last 10 bytes of a file which is 100 bytes long:

fs.createReadStream('sample.txt', {start: 90, end: 99});
If options is a string, then it specifies the encoding.

fs.createWriteStream(path[, options])#
Added in: v0.1.31
path <String> | <Buffer>
options <String> | <Object>
flags <String>
defaultEncoding <String>
fd <Integer>
mode <Integer>
autoClose <Boolean>
start <Integer>
Returns a new WriteStream object. (See Writable Stream).

options is an object or string with the following defaults:

{
  flags: 'w',
  defaultEncoding: 'utf8',
  fd: null,
  mode: 0o666,
  autoClose: true
}
options may also include a start option to allow writing data at some position past the beginning of the file. Modifying a file rather than replacing it may require a flags mode of r+ rather than the default mode w. The defaultEncoding can be any one of those accepted by Buffer.

If autoClose is set to true (default behavior) on error or end the file descriptor will be closed automatically. If autoClose is false, then the file descriptor won't be closed, even if there's an error. It is your responsibility to close it and make sure there's no file descriptor leak.

Like ReadStream, if fd is specified, WriteStream will ignore the path argument and will use the specified file descriptor. This means that no 'open' event will be emitted. Note that fd should be blocking; non-blocking fds should be passed to net.Socket.

If options is a string, then it specifies the encoding.

fs.exists(path, callback)#
Added in: v0.0.2 Deprecated since: v1.0.0
Stability: 0 - Deprecated: Use fs.stat() or fs.access() instead.
path <String> | <Buffer>
callback <Function>
Test whether or not the given path exists by checking with the file system. Then call the callback argument with either true or false. Example:

fs.exists('/etc/passwd', (exists) => {
  console.log(exists ? 'it\'s there' : 'no passwd!');
});
Note that the parameter to this callback is not consistent with other Node.js callbacks. Normally, the first parameter to a Node.js callback is an err parameter, optionally followed by other parameters. The fs.exists() callback has only one boolean parameter. This is one reason fs.access() is recommended instead of fs.exists().

Using fs.exists() to check for the existence of a file before calling fs.open(), fs.readFile() or fs.writeFile() is not recommended. Doing so introduces a race condition, since other processes may change the file's state between the two calls. Instead, user code should open/read/write the file directly and handle the error raised if the file does not exist.

For example:

write (NOT RECOMMENDED)

fs.exists('myfile', (exists) => {
  if (exists) {
    console.error('myfile already exists');
  } else {
    fs.open('myfile', 'wx', (err, fd) => {
      if (err) throw err;
      writeMyData(fd);
    });
  }
});
write (RECOMMENDED)

fs.open('myfile', 'wx', (err, fd) => {
  if (err) {
    if (err.code === "EEXIST") {
      console.error('myfile already exists');
      return;
    } else {
      throw err;
    }
  }
  writeMyData(fd);
});
read (NOT RECOMMENDED)

fs.exists('myfile', (exists) => {
  if (exists) {
    fs.open('myfile', 'r', (err, fd) => {
      readMyData(fd);
    });
  } else {
    console.error('myfile does not exist');
  }
});
read (RECOMMENDED)

fs.open('myfile', 'r', (err, fd) => {
  if (err) {
    if (err.code === "ENOENT") {
      console.error('myfile does not exist');
      return;
    } else {
      throw err;
    }
  } else {
    readMyData(fd);
  }
});
The "not recommended" examples above check for existence and then use the file; the "recommended" examples are better because they use the file directly and handle the error, if any.

In general, check for the existence of a file only if the file won’t be used directly, for example when its existence is a signal from another process.

fs.existsSync(path)#
Added in: v0.1.21
path <String> | <Buffer>
Synchronous version of fs.exists(). Returns true if the file exists, false otherwise.

Note that fs.exists() is deprecated, but fs.existsSync() is not. (The callback parameter to fs.exists() accepts parameters that are inconsistent with other Node.js callbacks. fs.existsSync() does not use a callback.)

fs.fchmod(fd, mode, callback)#
Added in: v0.4.7
fd <Integer>
mode <Integer>
callback <Function>
Asynchronous fchmod(2). No arguments other than a possible exception are given to the completion callback.

fs.fchmodSync(fd, mode)#
Added in: v0.4.7
fd <Integer>
mode <Integer>
Synchronous fchmod(2). Returns undefined.

autoClose <Boolean>
start <Integer>
end <Integer>
Returns a new ReadStream object. (See Readable Stream).

Be aware that, unlike the default value set for highWaterMark on a readable stream (16 kb), the stream returned by this method has a default value of 64 kb for the same parameter.

options is an object or string with the following defaults:

{
  flags: 'r',
  encoding: null,
  fd: null,
  mode: 0o666,
  autoClose: true
}
options can include start and end values to read a range of bytes from the file instead of the entire file. Both start and end are inclusive and start counting at 0. If fd is specified and start is omitted or undefined, fs.createReadStream() reads sequentially from the current file position. The encoding can be any one of those accepted by Buffer.

If fd is specified, ReadStream will ignore the path argument and will use the specified file descriptor. This means that no 'open' event will be emitted. Note that fd should be blocking; non-blocking fds should be passed to net.Socket.

If autoClose is false, then the file descriptor won't be closed, even if there's an error. It is your responsibility to close it and make sure there's no file descriptor leak. If autoClose is set to true (default behavior), on error or end the file descriptor will be closed automatically.

mode sets the file mode (permission and sticky bits), but only if the file was created.

An example to read the last 10 bytes of a file which is 100 bytes long:

fs.createReadStream('sample.txt', {start: 90, end: 99});
If options is a string, then it specifies the encoding.

fs.createWriteStream(path[, options])#
Added in: v0.1.31
path <String> | <Buffer>
options <String> | <Object>
flags <String>
defaultEncoding <String>
fd <Integer>
mode <Integer>
autoClose <Boolean>
start <Integer>
Returns a new WriteStream object. (See Writable Stream).

options is an object or string with the following defaults:

{
  flags: 'w',
  defaultEncoding: 'utf8',
  fd: null,
  mode: 0o666,
  autoClose: true
}
options may also include a start option to allow writing data at some position past the beginning of the file. Modifying a file rather than replacing it may require a flags mode of r+ rather than the default mode w. The defaultEncoding can be any one of those accepted by Buffer.

If autoClose is set to true (default behavior) on error or end the file descriptor will be closed automatically. If autoClose is false, then the file descriptor won't be closed, even if there's an error. It is your responsibility to close it and make sure there's no file descriptor leak.

Like ReadStream, if fd is specified, WriteStream will ignore the path argument and will use the specified file descriptor. This means that no 'open' event will be emitted. Note that fd should be blocking; non-blocking fds should be passed to net.Socket.

If options is a string, then it specifies the encoding.

fs.exists(path, callback)#
Added in: v0.0.2 Deprecated since: v1.0.0
Stability: 0 - Deprecated: Use fs.stat() or fs.access() instead.
path <String> | <Buffer>
callback <Function>
Test whether or not the given path exists by checking with the file system. Then call the callback argument with either true or false. Example:

fs.exists('/etc/passwd', (exists) => {
  console.log(exists ? 'it\'s there' : 'no passwd!');
});
Note that the parameter to this callback is not consistent with other Node.js callbacks. Normally, the first parameter to a Node.js callback is an err parameter, optionally followed by other parameters. The fs.exists() callback has only one boolean parameter. This is one reason fs.access() is recommended instead of fs.exists().

Using fs.exists() to check for the existence of a file before calling fs.open(), fs.readFile() or fs.writeFile() is not recommended. Doing so introduces a race condition, since other processes may change the file's state between the two calls. Instead, user code should open/read/write the file directly and handle the error raised if the file does not exist.

For example:

write (NOT RECOMMENDED)

fs.exists('myfile', (exists) => {
  if (exists) {
    console.error('myfile already exists');
  } else {
    fs.open('myfile', 'wx', (err, fd) => {
      if (err) throw err;
      writeMyData(fd);
    });
  }
});
write (RECOMMENDED)

fs.open('myfile', 'wx', (err, fd) => {
  if (err) {
    if (err.code === "EEXIST") {
      console.error('myfile already exists');
      return;
    } else {
      throw err;
    }
  }
  writeMyData(fd);
});
read (NOT RECOMMENDED)

fs.exists('myfile', (exists) => {
  if (exists) {
    fs.open('myfile', 'r', (err, fd) => {
      readMyData(fd);
    });
  } else {
    console.error('myfile does not exist');
  }
});
read (RECOMMENDED)

fs.open('myfile', 'r', (err, fd) => {
  if (err) {
    if (err.code === "ENOENT") {
      console.error('myfile does not exist');
      return;
    } else {
      throw err;
    }
  } else {
    readMyData(fd);
  }
});
The "not recommended" examples above check for existence and then use the file; the "recommended" examples are better because they use the file directly and handle the error, if any.

In general, check for the existence of a file only if the file won’t be used directly, for example when its existence is a signal from another process.

fs.existsSync(path)#
Added in: v0.1.21
path <String> | <Buffer>
Synchronous version of fs.exists(). Returns true if the file exists, false otherwise.

Note that fs.exists() is deprecated, but fs.existsSync() is not. (The callback parameter to fs.exists() accepts parameters that are inconsistent with other Node.js callbacks. fs.existsSync() does not use a callback.)

fs.fchmod(fd, mode, callback)#
Added in: v0.4.7
fd <Integer>
mode <Integer>
callback <Function>
Asynchronous fchmod(2). No arguments other than a possible exception are given to the completion callback.

fs.fchmodSync(fd, mode)#
Added in: v0.4.7
fd <Integer>
mode <Integer>
Synchronous fchmod(2). Returns undefined.



Speed up your Rails career in 2017! Attend our Rails/DDD workshops, 12-13 January, 2017, Wrocław, Poland.
Don't forget about eager_load when extending autoload paths

by Robert Pankowecki November 9, 2014

  Add me on Snapchat!
Share:   Follow:  

I am sure you know about config.autoload_paths. A setting which allows you to add aditional directories (besides app/* which works out of box) that can be used for placing your .rb files. The documentation mentions a config.autoload_paths += %W(#{config.root}/extras) example. But the most common way to use it is probably to add lib directory (especially after the transition from rails 2 to rails 3).

Another (maybe not that common) usecase is to have some components (such as notification_center for example) in top-level directory. To make it possible for them to work with your app people are usually using:

config.autoload_paths += %W( #{config.root}/notification_center )
or

config.autoload_paths += %W( #{config.root}/notification_center/lib )
And it is all cool except for one thing they might have forgotten to mention to you. How it all works in production and what you can do to make it work better.

Example

Let’s say we have two files

# root/extras/foo.rb
class Foo
end
and

# root/app/models/blog.rb
class Blog < ActiveRecord::Base
end
Our configuration looks like this:

# root/config/application.rb
config.autoload_paths += %W( #{config.root}/extras )
Things are ok in development

Now, let’s check how it behaves in development.

defined?(Blog)
# => nil
defined?(Foo)
# => nil

Blog
# => Blog (call 'Blog.connection' to establish a connection)
Foo
# => Foo

defined?(Blog)
# => "constant"
defined?(Foo)
# => "constant"
As you can see from this trivial example, at first nothing is loaded. Neither Blog, nor Foo is known. When we try to use them, rails autoloading jumps in. const_missing is handled, it looks for the classes in proper directories based on the convention and bang. app/models/blog.rb is loaded, Blog class is now known under Blog constant. Same goes for extras/foo.rb and Foo class.

Eager loading kicks in on production, doesn’t it?

But on the production, the situation is a little different…

defined?(Blog)
# => "constant"

defined?(Foo)
# => nil

Blog
# => Blog (call 'Blog.connection' to establish a connection)
Foo
# => Foo

defined?(Blog)
# => "constant"
defined?(Foo)
# => "constant"
Even before we try to use Blog for the very first time, the class is already loaded and the constant is known. Why is that so? Because of eager loading.

In production to make things faster Rails is using a slightly different strategy. Before running our app it is requiring *.rb files to load as much of our code as possible. This way, when the app starts running and serving requests it doesn’t spend time looking where classes are on the file system based on the convention but can server the request immediately.

There is also one more reason. When the webserver (unicorn, passenger, whatever) is using forking model to spawn workers it can leverage Copy-On-Write technique for memory managment. Master has all the code loaded, workers are created by forking master. Workers share some of the memory with master as long as it is not changed. It means that workers don’t take as much memory as they would be but a lower amount. Their processes don’t know they share the memory. They can’t interact with each other that way. It does not work like threads. It just the operating systems knows that for now instead of copying entire memory of master process to fork process, it can omit doing it. At least until they all just read from this memory. Check out more how passenger describes it or this digital ocean blogpost.

But what I want you to focus on is not that Blog constant is defined and eagerly loaded (that’s nothing new since many Rails versions ago). I want you to notice that Foo constant is not loaded in production environment.

defined?(Blog)
# => "constant"

defined?(Foo)
# => nil
Why is that a problem? For the opposite reasons why eager loading is a good thing. When Foo is not eager loaded it means that:

when there is HTTP request hitting your app which needs to know about Foo to get finished, it will be served a bit slower. Not much for a one class, but still. Slower. It needs to find foo.rb in the directoriess and load this class.
All workers can’t share in memory the code where Foo is defined. The copy-on-write optimization won’t be used here.
If all that was for one class, that wouldn’t be much problem. But with some legacy rails applications I’ve seen them adding lot more directories to config.autoload_paths. And not a single class from those directories is eager loaded on production. That can hurt the performance of few initial requests after deploy that will need to dynamicaly load some of these classes. This can be especially painful when you practice continuous deployment. We don’t want our customers to be affected by our deploys.

How can we fix it?

There is another, less known rails configuration called config.eager_load_paths that we can use to achieve our goals.

config.eager_load_paths += %W( #{config.root}/extras )
How will that work on production? Let’s see.

defined?(Blog)
# => "constant"
defined?(Foo)
# => "constant"
Not only is our class/constant Foo from extras/foo.rb autoloaded now, but it is also eager loaded in production mode. That fixed the problem.

Wait, does it mean you need to write two lines instead of one from now on?

config.autoload_paths += %W( #{config.root}/extras )
config.eager_load_paths += %W( #{config.root}/extras )
Autoloading is using eager loading paths as well

It doesn’t seem so. You don’t need to write two lines.

If you just use

config.eager_load_paths += %W( #{config.root}/extras )
development and production environments seem to be working just fine. I think because autoloading is configured to check for eager loaded paths.

def _all_autoload_paths
  @_all_autoload_paths ||= (
    config.autoload_paths   +
    config.eager_load_paths +
    config.autoload_once_paths
  ).uniq
end
in Rails::Engine code.

One more thing

Unfortunately I’ve seen many people doing things like

config.autoload_paths += %W( #{config.root}/app/services )
config.autoload_paths += %W( #{config.root}/app/presenters )
It is completely unnecessary because app/* is already added there. You can just add any directory to app/ and start use it like you use app/controllers and app/models. You might however need to restart your console, server or spring server (spring stop) for it start working. You can see the default rails 4.1.7 paths configuration

def paths
  @paths ||= begin
    paths = Rails::Paths::Root.new(@root)

    paths.add "app",                 eager_load: true, glob: "*"
    paths.add "app/assets",          glob: "*"
    paths.add "app/controllers",     eager_load: true
    paths.add "app/helpers",         eager_load: true
    paths.add "app/models",          eager_load: true
    paths.add "app/mailers",         eager_load: true
    paths.add "app/views"

    paths.add "app/controllers/concerns", eager_load: true
    paths.add "app/models/concerns",      eager_load: true

    paths.add "lib",                 load_path: true
    paths.add "lib/assets",          glob: "*"
    paths.add "lib/tasks",           glob: "**/*.rake"

    paths.add "config"
    paths.add "config/environments", glob: "#{Rails.env}.rb"
    paths.add "config/initializers", glob: "**/*.rb"
    paths.add "config/locales",      glob: "*.{rb,yml}"
    paths.add "config/routes.rb"

    paths.add "db"
    paths.add "db/migrate"
    paths.add "db/seeds.rb"

    paths.add "vendor",              load_path: true
    paths.add "vendor/assets",       glob: "*"

    paths
  end
end
Notice the glob for paths.add "app", eager_load: true, glob: "*" that explains subdirectories of app working.

You can always verify your settings in the console with

Rails.configuration.autoload_paths
Rails.configuration.eager_load_paths
to be sure.

config.paths and a conclusion

If you look at Rails::Engine::Configuration a litle bit down the lines, you will see how these methods are defined:

def eager_load_paths
  @eager_load_paths ||= paths.eager_load
end

def autoload_once_paths
  @autoload_once_paths ||= paths.autoload_once
end

def autoload_paths
  @autoload_paths ||= paths.autoload_paths
end
They all delegate first call to paths which is Rails.configuration.paths. Which leads us to a conclusion that we could configure our extras directory the same way Rails does it.

config.paths.add "extras", eager_load: true
Isn’t that nice?

Warning

Don’t confuse eager loading of code with eager loding of active record objects which we also happen to have an article about. The numenclature they use is similar but they mean completely different things.

Did you like this article? You might find our Rails books interesting as well .

     

  Add me on Snapchat!
Share:    Follow:  

Focus Retriever



Speed up your Rails career in 2017! Attend our Rails/DDD workshops, 12-13 January, 2017, Wrocław, Poland.
Don't forget about eager_load when extending autoload paths

by Robert Pankowecki November 9, 2014

  Add me on Snapchat!
Share:   Follow:  

I am sure you know about config.autoload_paths. A setting which allows you to add aditional directories (besides app/* which works out of box) that can be used for placing your .rb files. The documentation mentions a config.autoload_paths += %W(#{config.root}/extras) example. But the most common way to use it is probably to add lib directory (especially after the transition from rails 2 to rails 3).

Another (maybe not that common) usecase is to have some components (such as notification_center for example) in top-level directory. To make it possible for them to work with your app people are usually using:

config.autoload_paths += %W( #{config.root}/notification_center )
or

config.autoload_paths += %W( #{config.root}/notification_center/lib )
And it is all cool except for one thing they might have forgotten to mention to you. How it all works in production and what you can do to make it work better.

Example

Let’s say we have two files

# root/extras/foo.rb
class Foo
end
and

# root/app/models/blog.rb
class Blog < ActiveRecord::Base
end
Our configuration looks like this:

# root/config/application.rb
config.autoload_paths += %W( #{config.root}/extras )
Things are ok in development

Now, let’s check how it behaves in development.

defined?(Blog)
# => nil
defined?(Foo)
# => nil

Blog
# => Blog (call 'Blog.connection' to establish a connection)
Foo
# => Foo

defined?(Blog)
# => "constant"
defined?(Foo)
# => "constant"
As you can see from this trivial example, at first nothing is loaded. Neither Blog, nor Foo is known. When we try to use them, rails autoloading jumps in. const_missing is handled, it looks for the classes in proper directories based on the convention and bang. app/models/blog.rb is loaded, Blog class is now known under Blog constant. Same goes for extras/foo.rb and Foo class.

Eager loading kicks in on production, doesn’t it?

But on the production, the situation is a little different…

defined?(Blog)
# => "constant"

defined?(Foo)
# => nil

Blog
# => Blog (call 'Blog.connection' to establish a connection)
Foo
# => Foo

defined?(Blog)
# => "constant"
defined?(Foo)
# => "constant"
Even before we try to use Blog for the very first time, the class is already loaded and the constant is known. Why is that so? Because of eager loading.

In production to make things faster Rails is using a slightly different strategy. Before running our app it is requiring *.rb files to load as much of our code as possible. This way, when the app starts running and serving requests it doesn’t spend time looking where classes are on the file system based on the convention but can server the request immediately.

There is also one more reason. When the webserver (unicorn, passenger, whatever) is using forking model to spawn workers it can leverage Copy-On-Write technique for memory managment. Master has all the code loaded, workers are created by forking master. Workers share some of the memory with master as long as it is not changed. It means that workers don’t take as much memory as they would be but a lower amount. Their processes don’t know they share the memory. They can’t interact with each other that way. It does not work like threads. It just the operating systems knows that for now instead of copying entire memory of master process to fork process, it can omit doing it. At least until they all just read from this memory. Check out more how passenger describes it or this digital ocean blogpost.

But what I want you to focus on is not that Blog constant is defined and eagerly loaded (that’s nothing new since many Rails versions ago). I want you to notice that Foo constant is not loaded in production environment.

defined?(Blog)
# => "constant"

defined?(Foo)
# => nil
Why is that a problem? For the opposite reasons why eager loading is a good thing. When Foo is not eager loaded it means that:

when there is HTTP request hitting your app which needs to know about Foo to get finished, it will be served a bit slower. Not much for a one class, but still. Slower. It needs to find foo.rb in the directoriess and load this class.
All workers can’t share in memory the code where Foo is defined. The copy-on-write optimization won’t be used here.
If all that was for one class, that wouldn’t be much problem. But with some legacy rails applications I’ve seen them adding lot more directories to config.autoload_paths. And not a single class from those directories is eager loaded on production. That can hurt the performance of few initial requests after deploy that will need to dynamicaly load some of these classes. This can be especially painful when you practice continuous deployment. We don’t want our customers to be affected by our deploys.

How can we fix it?

There is another, less known rails configuration called config.eager_load_paths that we can use to achieve our goals.

config.eager_load_paths += %W( #{config.root}/extras )
How will that work on production? Let’s see.

defined?(Blog)
# => "constant"
defined?(Foo)
# => "constant"
Not only is our class/constant Foo from extras/foo.rb autoloaded now, but it is also eager loaded in production mode. That fixed the problem.

Wait, does it mean you need to write two lines instead of one from now on?

config.autoload_paths += %W( #{config.root}/extras )
config.eager_load_paths += %W( #{config.root}/extras )
Autoloading is using eager loading paths as well

It doesn’t seem so. You don’t need to write two lines.

If you just use

config.eager_load_paths += %W( #{config.root}/extras )
development and production environments seem to be working just fine. I think because autoloading is configured to check for eager loaded paths.

def _all_autoload_paths
  @_all_autoload_paths ||= (
    config.autoload_paths   +
    config.eager_load_paths +
    config.autoload_once_paths
  ).uniq
end
in Rails::Engine code.

One more thing

Unfortunately I’ve seen many people doing things like

config.autoload_paths += %W( #{config.root}/app/services )
config.autoload_paths += %W( #{config.root}/app/presenters )
It is completely unnecessary because app/* is already added there. You can just add any directory to app/ and start use it like you use app/controllers and app/models. You might however need to restart your console, server or spring server (spring stop) for it start working. You can see the default rails 4.1.7 paths configuration

def paths
  @paths ||= begin
    paths = Rails::Paths::Root.new(@root)

    paths.add "app",                 eager_load: true, glob: "*"
    paths.add "app/assets",          glob: "*"
    paths.add "app/controllers",     eager_load: true
    paths.add "app/helpers",         eager_load: true
    paths.add "app/models",          eager_load: true
    paths.add "app/mailers",         eager_load: true
    paths.add "app/views"

    paths.add "app/controllers/concerns", eager_load: true
    paths.add "app/models/concerns",      eager_load: true

    paths.add "lib",                 load_path: true
    paths.add "lib/assets",          glob: "*"
    paths.add "lib/tasks",           glob: "**/*.rake"

    paths.add "config"
    paths.add "config/environments", glob: "#{Rails.env}.rb"
    paths.add "config/initializers", glob: "**/*.rb"
    paths.add "config/locales",      glob: "*.{rb,yml}"
    paths.add "config/routes.rb"

    paths.add "db"
    paths.add "db/migrate"
    paths.add "db/seeds.rb"

    paths.add "vendor",              load_path: true
    paths.add "vendor/assets",       glob: "*"

    paths
  end
end
Notice the glob for paths.add "app", eager_load: true, glob: "*" that explains subdirectories of app working.

You can always verify your settings in the console with

Rails.configuration.autoload_paths
Rails.configuration.eager_load_paths
to be sure.

config.paths and a conclusion

If you look at Rails::Engine::Configuration a litle bit down the lines, you will see how these methods are defined:

def eager_load_paths
  @eager_load_paths ||= paths.eager_load
end

def autoload_once_paths
  @autoload_once_paths ||= paths.autoload_once
end

def autoload_paths
  @autoload_paths ||= paths.autoload_paths
end
They all delegate first call to paths which is Rails.configuration.paths. Which leads us to a conclusion that we could configure our extras directory the same way Rails does it.

config.paths.add "extras", eager_load: true
Isn’t that nice?

Warning

Don’t confuse eager loading of code with eager loding of active record objects which we also happen to have an article about. The numenclature they use is similar but they mean completely different things.

Did you like this article? You might find our Rails books interesting as well .

     

  Add me on Snapchat!
Share:    Follow:  

Focus Retriever



Speed up your Rails career in 2017! Attend our Rails/DDD workshops, 12-13 January, 2017, Wrocław, Poland.
Don't forget about eager_load when extending autoload paths

by Robert Pankowecki November 9, 2014

  Add me on Snapchat!
Share:   Follow:  

I am sure you know about config.autoload_paths. A setting which allows you to add aditional directories (besides app/* which works out of box) that can be used for placing your .rb files. The documentation mentions a config.autoload_paths += %W(#{config.root}/extras) example. But the most common way to use it is probably to add lib directory (especially after the transition from rails 2 to rails 3).

Another (maybe not that common) usecase is to have some components (such as notification_center for example) in top-level directory. To make it possible for them to work with your app people are usually using:

config.autoload_paths += %W( #{config.root}/notification_center )
or

config.autoload_paths += %W( #{config.root}/notification_center/lib )
And it is all cool except for one thing they might have forgotten to mention to you. How it all works in production and what you can do to make it work better.

Example

Let’s say we have two files

# root/extras/foo.rb
class Foo
end
and

# root/app/models/blog.rb
class Blog < ActiveRecord::Base
end
Our configuration looks like this:

# root/config/application.rb
config.autoload_paths += %W( #{config.root}/extras )
Things are ok in development

Now, let’s check how it behaves in development.

defined?(Blog)
# => nil
defined?(Foo)
# => nil

Blog
# => Blog (call 'Blog.connection' to establish a connection)
Foo
# => Foo

defined?(Blog)
# => "constant"
defined?(Foo)
# => "constant"
As you can see from this trivial example, at first nothing is loaded. Neither Blog, nor Foo is known. When we try to use them, rails autoloading jumps in. const_missing is handled, it looks for the classes in proper directories based on the convention and bang. app/models/blog.rb is loaded, Blog class is now known under Blog constant. Same goes for extras/foo.rb and Foo class.

Eager loading kicks in on production, doesn’t it?

But on the production, the situation is a little different…

defined?(Blog)
# => "constant"

defined?(Foo)
# => nil

Blog
# => Blog (call 'Blog.connection' to establish a connection)
Foo
# => Foo

defined?(Blog)
# => "constant"
defined?(Foo)
# => "constant"
Even before we try to use Blog for the very first time, the class is already loaded and the constant is known. Why is that so? Because of eager loading.

In production to make things faster Rails is using a slightly different strategy. Before running our app it is requiring *.rb files to load as much of our code as possible. This way, when the app starts running and serving requests it doesn’t spend time looking where classes are on the file system based on the convention but can server the request immediately.

There is also one more reason. When the webserver (unicorn, passenger, whatever) is using forking model to spawn workers it can leverage Copy-On-Write technique for memory managment. Master has all the code loaded, workers are created by forking master. Workers share some of the memory with master as long as it is not changed. It means that workers don’t take as much memory as they would be but a lower amount. Their processes don’t know they share the memory. They can’t interact with each other that way. It does not work like threads. It just the operating systems knows that for now instead of copying entire memory of master process to fork process, it can omit doing it. At least until they all just read from this memory. Check out more how passenger describes it or this digital ocean blogpost.

But what I want you to focus on is not that Blog constant is defined and eagerly loaded (that’s nothing new since many Rails versions ago). I want you to notice that Foo constant is not loaded in production environment.

defined?(Blog)
# => "constant"

defined?(Foo)
# => nil
Why is that a problem? For the opposite reasons why eager loading is a good thing. When Foo is not eager loaded it means that:

when there is HTTP request hitting your app which needs to know about Foo to get finished, it will be served a bit slower. Not much for a one class, but still. Slower. It needs to find foo.rb in the directoriess and load this class.
All workers can’t share in memory the code where Foo is defined. The copy-on-write optimization won’t be used here.
If all that was for one class, that wouldn’t be much problem. But with some legacy rails applications I’ve seen them adding lot more directories to config.autoload_paths. And not a single class from those directories is eager loaded on production. That can hurt the performance of few initial requests after deploy that will need to dynamicaly load some of these classes. This can be especially painful when you practice continuous deployment. We don’t want our customers to be affected by our deploys.

How can we fix it?

There is another, less known rails configuration called config.eager_load_paths that we can use to achieve our goals.

config.eager_load_paths += %W( #{config.root}/extras )
How will that work on production? Let’s see.

defined?(Blog)
# => "constant"
defined?(Foo)
# => "constant"
Not only is our class/constant Foo from extras/foo.rb autoloaded now, but it is also eager loaded in production mode. That fixed the problem.

Wait, does it mean you need to write two lines instead of one from now on?

config.autoload_paths += %W( #{config.root}/extras )
config.eager_load_paths += %W( #{config.root}/extras )
Autoloading is using eager loading paths as well

It doesn’t seem so. You don’t need to write two lines.

If you just use

config.eager_load_paths += %W( #{config.root}/extras )
development and production environments seem to be working just fine. I think because autoloading is configured to check for eager loaded paths.

def _all_autoload_paths
  @_all_autoload_paths ||= (
    config.autoload_paths   +
    config.eager_load_paths +
    config.autoload_once_paths
  ).uniq
end
in Rails::Engine code.

One more thing

Unfortunately I’ve seen many people doing things like

config.autoload_paths += %W( #{config.root}/app/services )
config.autoload_paths += %W( #{config.root}/app/presenters )
It is completely unnecessary because app/* is already added there. You can just add any directory to app/ and start use it like you use app/controllers and app/models. You might however need to restart your console, server or spring server (spring stop) for it start working. You can see the default rails 4.1.7 paths configuration

def paths
  @paths ||= begin
    paths = Rails::Paths::Root.new(@root)

    paths.add "app",                 eager_load: true, glob: "*"
    paths.add "app/assets",          glob: "*"
    paths.add "app/controllers",     eager_load: true
    paths.add "app/helpers",         eager_load: true
    paths.add "app/models",          eager_load: true
    paths.add "app/mailers",         eager_load: true
    paths.add "app/views"

    paths.add "app/controllers/concerns", eager_load: true
    paths.add "app/models/concerns",      eager_load: true

    paths.add "lib",                 load_path: true
    paths.add "lib/assets",          glob: "*"
    paths.add "lib/tasks",           glob: "**/*.rake"

    paths.add "config"
    paths.add "config/environments", glob: "#{Rails.env}.rb"
    paths.add "config/initializers", glob: "**/*.rb"
    paths.add "config/locales",      glob: "*.{rb,yml}"
    paths.add "config/routes.rb"

    paths.add "db"
    paths.add "db/migrate"
    paths.add "db/seeds.rb"

    paths.add "vendor",              load_path: true
    paths.add "vendor/assets",       glob: "*"

    paths
  end
end
Notice the glob for paths.add "app", eager_load: true, glob: "*" that explains subdirectories of app working.

You can always verify your settings in the console with

Rails.configuration.autoload_paths
Rails.configuration.eager_load_paths
to be sure.

config.paths and a conclusion

If you look at Rails::Engine::Configuration a litle bit down the lines, you will see how these methods are defined:

def eager_load_paths
  @eager_load_paths ||= paths.eager_load
end

def autoload_once_paths
  @autoload_once_paths ||= paths.autoload_once
end

def autoload_paths
  @autoload_paths ||= paths.autoload_paths
end
They all delegate first call to paths which is Rails.configuration.paths. Which leads us to a conclusion that we could configure our extras directory the same way Rails does it.

config.paths.add "extras", eager_load: true
Isn’t that nice?

Warning

Don’t confuse eager loading of code with eager loding of active record objects which we also happen to have an article about. The numenclature they use is similar but they mean completely different things.

Did you like this article? You might find our Rails books interesting as well .

     

  Add me on Snapchat!
Share:    Follow:  

Focus Retriever
