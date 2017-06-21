export class FeedItem {
    public constructor(
        public author: string,
        public comments: string,
        public rating: string,
        public timestamp: string,
        public image: string,
        public message: string,
        public topic: string
    ) { }
}
