typescript-minibus
==================

This is a simple pub-sub module written in TypeScript

It is based on this two sources.

https://gist.github.com/k33g/3959903
<br>
http://www.aaron-powell.com/posts/2012-10-02-pubsub-in-typescript.html

Thanks Philippe Charriere and Aaron Powell for their contribution.


TypeScript version 0.9.7

###Usage
I tried to make usage as simple as possible.

####New Instance
var minibus = new Gom.EventManager();

####Publish
minibus.publish("message", observable, optional_data);

####Subscribe
var sub = subscribe("message", function (observable, optional_data) {
   console.log(observable, optional_data);
});

####Unsubscribe
sub.unSubscribe();
<br>
minibus.unSubscribe(sub);



This code is provided as is. Feel free to Fork and contribute.
