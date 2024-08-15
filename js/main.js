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
    img.src = `images/techstack/${technologies[tech]}`;

    const techP = document.createElement('p');
    techP.textContent = tech;

    imgWrapper.appendChild(img);

    card.appendChild(imgWrapper);
    card.appendChild(techP);

    techStack.appendChild(card);
});

const possibleExtensions = ['.svg', '.png', '.jpeg', '.jpg'];

const displayProjectStack = async (project) => {
    const stack = project.stack;
    const projectInfo = document.querySelector('.info');
    projectInfo.classList.remove('active');
    const projectStack = document.querySelector('.stack-details');
    projectStack.classList.add('active')
    projectStack.textContent = '';
    
    for (const tech of stack) {
        const card = document.createElement('div');
        card.classList.add('card');
    
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('card-img-wrapper');
        const img = document.createElement('img');
        const imgSrc = await findFile(tech, possibleExtensions);
        img.src = imgSrc;
    
        const techP = document.createElement('p');
        techP.textContent = tech;
    
        imgWrapper.appendChild(img);
    
        card.appendChild(imgWrapper);
        card.appendChild(techP);
    
        projectStack.appendChild(card);
    };
}

const checkFileExists = async (filename) => {
    return fetch(filename, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                return filename;
            }
            return null;
        })
        .catch(() => null);
}

const findFile = async (baseName, extensions) => {
    for (const extension of extensions) {
        const filename = `images/techstack/${baseName.toLowerCase()}${extension}`;
        const foundFile = await checkFileExists(filename);
        if (foundFile) {
            return foundFile;
        }
    }
    return null;
}


document.addEventListener('DOMContentLoaded', () => {
    fetch('/projects/projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }
            return response.json();
        })
        .then(data => {
            const projects = data.projects;
            displayProjects(projects);
        })
        .catch(error => {
            console.error(error);
        });
})

const displayProjects = (projects) => {
    const container = document.querySelector('.projects-grid');

    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');

        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('header-img-wrapper');
        const img = document.createElement('img');
        img.src = `/images/${project.hero}`;
        img.alt = 'Project header image';
        imgWrapper.appendChild(img);
        
        const h3 = document.createElement('h3');
        h3.textContent = project.title;

        const p = document.createElement('p');
        p.textContent = project.description;

        const projectLinksDiv = document.createElement('div');
        projectLinksDiv.classList.add('project-links');

        const codeProjectLinkDiv = document.createElement('div');
        codeProjectLinkDiv.classList.add('project-link');
        const code = document.createElement('a');
        code.textContent = 'CODE';
        codeProjectLinkDiv.appendChild(code);

        const linkProjectLinkDiv = document.createElement('div');
        linkProjectLinkDiv.classList.add('project-link');
        const link = document.createElement('a');
        link.textContent = 'LINK';
        linkProjectLinkDiv.appendChild(link);

        projectLinksDiv.appendChild(codeProjectLinkDiv);
        projectLinksDiv.appendChild(linkProjectLinkDiv);

        projectDiv.appendChild(imgWrapper);
        projectDiv.appendChild(h3);
        projectDiv.appendChild(p);
        projectDiv.appendChild(projectLinksDiv);

        container.appendChild(projectDiv);

        projectDiv.addEventListener('click', () => {
            displayProjectStack(project);
            console.log(project);
        });
    });
}

