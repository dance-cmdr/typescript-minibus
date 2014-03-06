module MiniBus {

    class Subscription {
        constructor(
            public id: number,
            public message_id: string,
            public callback: (payload?: any, data?: any) => void) { }

        public unSubscribe() {
            new EventManager().unSubscribe(this);
        }
    }


    interface IMessage {
        subscribe(callback: (payload?: any) => void): any;
        unSubscribe(subRef: Subscription): void;
        notify(payload?: any, data?: any): void;
    }


    class Message implements IMessage {

        private _subscriptions: Subscription[];
        private _nextId: number;
        private _lastValue: any;
        private _id: string;

        constructor(public message: string) {
            this._id = message;
            this._subscriptions = [];
            this._nextId = 0;
        }

        public subscribe(callback: (payload?: any) => void) {
            var subscription = new Subscription(this._nextId++, this._id, callback);
            this._subscriptions[subscription.id] = subscription;
            return this._subscriptions[subscription.id];
        }

        public unSubscribe(subRef: Subscription) {
            var idx: number = 0,
                len: number = this._subscriptions.length;

            while (idx < len) {
                if (this._subscriptions[idx] === subRef) {
                    this._subscriptions.splice(idx, 1);
                    this._subscriptions[idx] = undefined;
                    console.log(subRef)
                    console.log('subscription terminated');
                }
                break;
                idx += 1;
            }
        }

        public notify(payload?: any, data?: any) {
            if (this._lastValue === payload) { }
            else {
                var index;
                for (index = 0; index < this._subscriptions.length; index++) {
                    if (this._subscriptions[index]) {
                        this._subscriptions[index].callback(payload, data);
                    }
                }
            }
          this._lastValue = payload;
        }
    }


    export class EventManager {
        private static _instance: EventManager = null;
        private _messages: any;

        constructor() {
            if (EventManager._instance === null) {
                this.init();
            }
            return EventManager._instance;
        }

        init() {
            this._messages = {};
            EventManager._instance = this;
        }

        subscribe(message: string, callback: (payload?: any) => void) {
            var msg: IMessage;
            msg = this._messages[message] ||
            <IMessage>(this._messages[message] = new Message(message));

            return msg.subscribe(callback);
        }

        unSubscribe(subRef: any) {
            if (!(subRef instanceof Subscription)) {
                console.log(subRef instanceof Subscription, subRef,'Error :: invalid argument! :: unSubscribe must be type of Subscription');
                return false;
            }
            (<IMessage>(this._messages[subRef.message_id])).unSubscribe(subRef);
        }

        publish(message: string, payload?: any, data?:any) {
            if (this._messages[message]) {
                (<IMessage>(this._messages[message])).notify(payload, data);
            }
        }
    }
}