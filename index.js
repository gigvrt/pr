function getEnv() {
    return process.env.NODE_ENV
}

class Profiler {
    constructor(label) {
        this.label = label;
        this.lastTime = null;
    }

    start() {
        this.lastTime = process.hrtime()
    }

    end() {
        const diff = process.hrtime(this.lastTime);
        const seconds = diff[0];
        const milliseconds = diff[1]

        console.log(`Timer "${this.label}" took ${seconds} seconds and ${milliseconds} milliseconds`);
    }

    getLabel() {
        return this.label
    }
}

const noopProfiler = {
    start() {
    },
    end() {
    }
};

function createProfiler(label) {
    if (getEnv() === "production") {
        return noopProfiler;
    }

    return new Profiler(label);
}

function getAllEvenNums(intNum) {
    const evenNumbers = [];

    for (let i = 0; i <= intNum; i += 2) {
        if (i === 0) {
            continue;
        }
        evenNumbers.push(i);
    }

    return evenNumbers;
}

const num = process.argv[2];

const profiler = createProfiler(`Find all even number between 0 and ${num}`);

profiler.start();
const evenNumbers = getAllEvenNums(num);
profiler.end();

console.log(evenNumbers)

console.log("label", profiler.getLabel())

console.log("pushing directly")

function coolUtil() {
    if(Math.random() < Math.random()) {
        return 'lucky + 3'
    }

    return "cooler - 1"
}

function superCooler() {
   if(Math.random() > Math.random()) {
        return 'lucky'
    }

    return "super cool"
}