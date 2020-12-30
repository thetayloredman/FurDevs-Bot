module.exports = class DiscordMenu {
    constructor(
        channel = new Discord.TextChannel(),
        uid,
        pages = [],
        messages = [],
        time = 180000,
        reactions = { first: "⏮️", back: "◀", next: "▶", last: "⏭️", stop: "⏹" }
    ) {
        this.channel = channel;
        this.pages = pages;
        this.time = time;
        this.reactions = reactions;
        this.page = 1;
        this.messages = messages;
        channel.send(pages[0]).then((msg) => {
            this.msg = msg;
            this.addReactions();
            this.createReactionCollector(uid);
        });
    }
    select(pg = 1) {
        this.page = pg;
        this.msg.edit(this.pages[pg - 1]);
    }
    createReactionCollector(uid) {
        let reactionCollector = this.msg.createReactionCollector(
            (r, u) => u.id == uid,
            { time: this.time }
        );
        this.reactionCollector = reactionCollector;
        reactionCollector.on("collect", (r) => {
            if (r.emoji.name == this.reactions.first) {
                if (this.page != 1) this.select(1);
            } else if (r.emoji.name == this.reactions.back) {
                if (this.page != 1) this.select(this.page - 1);
            } else if (r.emoji.name == this.reactions.next) {
                if (this.page != this.pages.length) this.select(this.page + 1);
            } else if (r.emoji.name == this.reactions.last) {
                if (this.page != this.pages.length) this.select(this.pages.length);
            } else if (r.emoji.name == this.reactions.stop) {
                reactionCollector.stop();
            }
            r.users.remove(uid);
        });
        reactionCollector.on("end", () => {
            this.endCollection();
        });
    }

    async endCollection() {
        this.msg.delete().catch(error => {
            // Only log the error if it is not an Unknown Message error
            if (error.code !== 10008) {
                sails.log.error('Failed to delete the message:', error);
            }
        });
        if (this.reactionCollector && !this.reactionCollector.ended)
            this.reactionCollector.stop();
    }

    async addReactions() {
        if (this.reactions.first) await this.msg.react(this.reactions.first);
        if (this.reactions.back) await this.msg.react(this.reactions.back);
        if (this.reactions.next) await this.msg.react(this.reactions.next);
        if (this.reactions.last) await this.msg.react(this.reactions.last);
        if (this.reactions.stop) await this.msg.react(this.reactions.stop);
    }
};