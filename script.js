function scrollToEvidence() {
    document.getElementById('evidence').scrollIntoView({ behavior: 'smooth' });
}

function revealEvidence(num) {
    const content = document.getElementById(`evidence-${num}`);
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
    } else {
        content.classList.add('hidden');
    }
}