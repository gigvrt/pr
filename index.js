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
        console.log(`Timer "${this.label}" took ${diff[0]} seconds and ${diff[1]} milliseconds`);
    }
}


const noopProfiler = {
    start() {
    },
    end() {
    }
};

function createProfiler(label) {
    if (process.env.NODE_ENV === "production") {
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