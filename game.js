const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}


function startGame() {
    state = {}
    showTextNode(1)

}
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    textNode.options.forEach(option => {
        if (showObtion(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectObtion(option))
            optionButtonsElement.appendChild(button)

        }
    })

}

function showObtion(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectObtion(option) {
    const nextTextNodeId = option.nextText
    state = Object.assign(state,option.setState)
    showTextNode(nextTextNodeId)

}

const textNodes = [
    {
        id: 1,
        text: 'A group of rebels in South-Hern province (located in the south of our nation) have seized some of our government buildings. What is our next move?',
        options: [
            {
                text: 'Crush them with a full land-operation',
                nextText: 2.1
            },
            {
                text: 'Negotiate with them',
                setState: {haveforce: true},
                nextText: 2
            },
        ]
    },
    {
        id:2,
        text: 'Well done, the rebellions have surrendered. Our northern neighbour Donkeykistan saw that we are distracted so they declared war on us',
        options: [
            {
                text: 'Attack them back with our current divisions and get their city Khanorov, which has some tank factories',
                requiredState: (currentState) => currentState.haveforce,
                setState: {haveforce: false, haveKhanorovandtank: true},
                nextText: 3
            },
            {
                text: 'Attack them back with our current divisions and get their city Branoiya, which has some missiles',
                requiredState: (currentState) => currentState.haveforce,
                setState: {haveforce: false, haveBranoiyaandmissile: true},
                nextText: 3
            }
        ]
    },
    {
        id:2.1,
        text: 'Well done, the rebellions have surrendered. Our northern neighbour Donkeykistan saw that we are distracted so they declared war on us',
        options: [
            {
                text: 'Our troops dont have time to move to the north so negotiating with them is our only choice left',
                setState: {haveforce: false, negotiate: true},
                nextText: 78
            }
        ]
    },
    {
        id:78,
        text: 'We have succesfully negotiate with them and only need to give them a few villages. You continue as the prime minister until a year later and retired. Neutral ending.',
        requiredState: (currentState) => currentState.negotiate,
    },
    {
        id: 3,
        text: 'What will we do next with our current weapons?',
        options: [
            {
                text: 'Launch our missiles to their capital',
                requiredState: (currentState) => currentState.haveBranoiyaandmissile,
                setState: {haveBranoiyaandmissile: false, victory: true},
                nextText: 45
            },
            {
                text: 'Do nothing with our missiles',
                requiredState: (currentState) => currentState.haveBranoiyaandmissile,
                setState: {haveBranoiyaandmissile: true, failure: true},
                nextText: 4.1
            },
            {
                text: 'Move our new tank divisions to other places',
                requiredState: (currentState) => currentState.haveKhanorovandtank,
                setState: {haveKhanorovandtank: false, failuretoo: true},
                nextText: 4.2
            },
            {
                text: 'Do nothing with our tanks',
                requiredState: (currentState) => currentState.haveKhanorovandtank,
                setState: {haveKhanorovandtank: true, failurethree: true},
                nextText: 4.3
            }

        ]
    },
    {
        id: 4.1,
        text: 'You failed, the enemy deployed their tanks and take back their land and reached our capital, bad ending.',
        requiredState: (currentState) => currentState.failure,
    },
    {
        id: 4.2,
        text: 'You failed, the enemy used their missiles and attack your tanks while they were still moving then take over your whole nation. Game over',
        requiredState: (currentState) => currentState.failuretoo,
    },
    {
        id: 4.3,
        text: 'Idiot, you did nothing with your tanks and expect to not lose any lands?',
        requiredState: (currentState) => currentState.failurethree,
    },
    {
        id: 45,
        text: 'the enemy capital was ruined and you quickly take over their lands. Victory',
        requiredState: (currentState) => currentState.victory,
    }
]

startGame()