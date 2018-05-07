module.exports = (Franz) => {
  const getMessages = function getMessages() {
    let count = 0;

    // get all the containers with overdue
    var overdue_all = document.querySelectorAll('.sidebarItem.owner.list.draggable.overdue');
    overdue_all.forEach(function(element) {
      local_count = parseInt(element.getElementsByTagName("span")[2].innerHTML);
      count += local_count;
    });

    // now try to get the inbox
    var overdue_inbox = document.querySelector('.sidebarItem.overdue')
    if (overdue_inbox !== null) {
      local_count = parseInt(overdue_inbox.getElementsByTagName("span")[2].innerHTML)
      count += isNaN(local_count) ? 0 : local_count;
    }

    Franz.setBadge(count);
  };

  Franz.loop(getMessages);
};