const technologies = {
    'JavaScript': 'javascript.png',
    'React': 'react.svg',
    'Redux': 'redux.svg',
    'Node': 'node.svg',
    'Express': 'expressjs.svg',
    'TypeScript': 'typescript.png',
    'SQL': 'sql.png',
    'Postgres': 'postgres.png',
    'MongoDB': 'mongodb.png',
    'Python': 'python.png',
    'Django': 'django.png',
};

const techStack = document.querySelector('.tech-stack');

Object.keys(technologies).forEach(tech => {
    const card = document.createElement('div');
    card.classList.add('card');

    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('card-img-wrapper');
    const img = document.createElement('img');
    img.src = `images/${technologies[tech]}`;

    const techP = document.createElement('p');
    techP.textContent = tech;

    imgWrapper.appendChild(img);

    card.appendChild(imgWrapper);
    card.appendChild(techP);

    techStack.appendChild(card);
})