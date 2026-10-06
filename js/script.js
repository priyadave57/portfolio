document.addEventListener('DOMContentLoaded',()=>{
  const typed=document.getElementById('typed');
  const words=['B.Tech CSE Student','Aspiring Web Developer','Python Learner','AI/ML Enthusiast'];
  let wi=0,ci=0,deleting=false;

  function type(){
    const w=words[wi];
    typed.textContent=w.slice(0,ci);

    if(!deleting){
      ci++;
      if(ci>w.length){
        deleting=true;
        setTimeout(type,1100);
        return;
      }
    }else{
      ci--;
      if(ci===0){
        deleting=false;
        wi=(wi+1)%words.length;
      }
    }

    setTimeout(type,deleting?55:85);
  }

  type();

  const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05
  });

  revealItems.forEach(item => {
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach(item => {
    item.classList.add('visible');
  });
}

  const bars=document.querySelectorAll('.skill-bar');

  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.style.width=e.target.dataset.width;
        obs.unobserve(e.target);
      }
    });
  },{threshold:.4});

  bars.forEach(b=>obs.observe(b));

  document.querySelectorAll('.progress-bar').forEach(bar=>{
    const target=bar.style.width;
    bar.style.width='0%';
    const progressObserver=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting){
        bar.style.transition='width 1s ease';
        bar.style.width=target;
        progressObserver.disconnect();
      }
    },{threshold:0.5});
    progressObserver.observe(bar);
  });

  document.querySelectorAll('.counter').forEach(c=>{
    const target=+c.dataset.target;
    let n=0;
    const step=Math.max(1,Math.ceil(target/25));

    const o=new IntersectionObserver(es=>{
      if(es[0].isIntersecting){
        const timer=setInterval(()=>{
          n+=step;

          if(n>=target){
            n=target;
            clearInterval(timer);
          }

          c.textContent=n;
        },40);

        o.disconnect();
      }
    },{threshold:.7});

    o.observe(c);
  });

  const top=document.getElementById('backToTop');

  window.addEventListener('scroll',()=>{
    top.classList.toggle('show',window.scrollY>500);
  });

  top.addEventListener('click',()=>{
    window.scrollTo({
      top:0,
      behavior:'smooth'
    });
  });

  document.querySelectorAll('#navMenu .nav-link').forEach(a=>{
    a.addEventListener('click',()=>{
      const menu=document.getElementById('navMenu');

      if(menu.classList.contains('show')){
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const visitorEmail = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !visitorEmail || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    const emailBody =
      `Name: ${name}\n` +
      `Email: ${visitorEmail}\n\n` +
      `Message:\n${message}`;

    const mailtoLink =
      'mailto:priya.dave332@gmail.com' +
      '?subject=' + encodeURIComponent(subject || 'Portfolio Contact') +
      '&body=' + encodeURIComponent(emailBody);

    window.location.href = mailtoLink;
  });
}
});