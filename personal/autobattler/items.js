
let cooldownInterval = null;
let currentCooldown = null;
const items = [sampleItem];

const triggerItem = (item) => {
    // initialize current cooldown to the item's configured cooldown
    if (currentCooldown === null) currentCooldown = item.cooldown;

    // if an interval is already running, do nothing
    if (cooldownInterval) return;

    cooldownInterval = setInterval(() => {
        currentCooldown--;

        // when it reaches 0 trigger the effect and reset
        if (currentCooldown <= 0) {
            damageDealt = item.damage;
            healthRestored = item.heal;
            item.specialEffect();
            currentCooldown = item.cooldown;
        }
    }, 1000);
};

const sampleItem = {
    id: "sample-item",
    name: "Sample Item",
    description: "This is a sample item.",
    cooldown: 5,
    damage: 10,
    heal: 5,
    specialEffect: () => {
        null;
    }
}
