// ============================================================
// تطبيق قائمة المهام - To-Do List
// جميع التعليقات بالعربي للفهم
// ============================================================

console.log('🚀 بدء تشغيل التطبيق...');

// ===== عناصر الصفحة =====
// جلب العناصر من HTML للتعامل معها
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCounter = document.getElementById('taskCounter');
const totalTasksSpan = document.getElementById('totalTasks');
const completedTasksSpan = document.getElementById('completedTasks');
const clearAllBtn = document.getElementById('clearAllBtn');

console.log('✅ تم العثور على العناصر');

// ===== مصفوفة المهام =====
// هنا سنخزن جميع المهام
let tasks = [];

// ===== تحميل من localStorage =====
// دالة لاسترجاع المهام المحفوظة في المتصفح
function loadTasks() {
    const stored = localStorage.getItem('mytasks');
    if (stored) {
        try {
            tasks = JSON.parse(stored);
            console.log('📥 تم تحميل المهام:', tasks.length, 'مهمة');
        } catch (e) {
            tasks = [];
        }
    } else {
        tasks = [];
        console.log('📭 لا توجد مهام محفوظة');
    }
    renderTasks(); // عرض المهام بعد التحميل
}

// ===== حفظ في localStorage =====
// دالة لحفظ المهام في المتصفح
function saveTasks() {
    localStorage.setItem('mytasks', JSON.stringify(tasks));
    console.log('💾 تم حفظ المهام:', tasks.length, 'مهمة');
}

// ===== عرض المهام =====
// دالة لعرض جميع المهام في الواجهة
function renderTasks() {
    console.log('🔄 جاري عرض المهام...');
    
    // مسح القائمة قبل إعادة العرض
    taskList.innerHTML = '';

    // التحقق: إذا كانت المصفوفة فارغة
    if (tasks.length === 0) {
        // عرض رسالة "لا توجد مهام"
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'empty-msg';
        emptyDiv.innerHTML = `
            <span>📭</span>
            No tasks yet<br>
            Add a new task from above
        `;
        taskList.appendChild(emptyDiv);
    } else {
        // حلقة لعرض كل مهمة
        tasks.forEach((task, index) => {
            // إنشاء عنصر القائمة
            const li = document.createElement('li');
            li.className = 'task-item';

            // الجزء الأيسر: النص ومربع الاختيار
            const textDiv = document.createElement('div');
            textDiv.className = 'task-text';
            if (task.completed) {
                textDiv.classList.add('completed'); // إضافة class للمهمة المكتملة
            }

            // مربع الاختيار (دائرة)
            const checkBox = document.createElement('span');
            checkBox.className = 'check-box';
            if (task.completed) {
                checkBox.classList.add('done'); // علامة ✓ للمكتمل
            }
            // عند الضغط على المربع: تبديل حالة الإكمال
            checkBox.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleComplete(index);
            });

            // النص
            const label = document.createElement('span');
            label.className = 'task-label';
            label.textContent = task.text;
            // عند الضغط على النص: تبديل حالة الإكمال
            label.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleComplete(index);
            });

            // إضافة المربع والنص إلى القسم
            textDiv.appendChild(checkBox);
            textDiv.appendChild(label);

            // ===== أزرار الإجراءات =====
            const actions = document.createElement('div');
            actions.className = 'task-actions';

            // زر التعديل
            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.textContent = '✏️';
            editBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                editTask(index);
            });

            // زر الحذف
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = '🗑️';
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                deleteTask(index);
            });

            // إضافة الأزرار إلى قسم الإجراءات
            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);

            // تجميع الأجزاء في عنصر القائمة
            li.appendChild(textDiv);
            li.appendChild(actions);
            taskList.appendChild(li);
        });
    }

    // تحديث الإحصائيات وحفظ التغييرات
    updateStats();
    saveTasks();
}

// ===== تبديل حالة الإكمال =====
// دالة لتغيير حالة المهمة (مكتملة / غير مكتملة)
function toggleComplete(index) {
    console.log('🔄 تبديل حالة المهمة رقم', index);
    if (index >= 0 && index < tasks.length) {
        tasks[index].completed = !tasks[index].completed; // عكس القيمة
        renderTasks(); // إعادة العرض
    }
}

// ===== حذف مهمة =====
// دالة لحذف مهمة مع تأكيد المستخدم
function deleteTask(index) {
    console.log('🗑️ حذف المهمة رقم', index);
    if (index >= 0 && index < tasks.length) {
        if (confirm(`Are you sure you want to delete: "${tasks[index].text}"?`)) {
            tasks.splice(index, 1); // حذف المهمة من المصفوفة
            renderTasks(); // إعادة العرض
        }
    }
}

// ===== تعديل مهمة =====
// دالة لتعديل نص المهمة
function editTask(index) {
    console.log('✏️ تعديل المهمة رقم', index);
    if (index >= 0 && index < tasks.length) {
        const newText = prompt('Edit task:', tasks[index].text);
        if (newText !== null && newText.trim() !== '') {
            tasks[index].text = newText.trim(); // تحديث النص
            renderTasks(); // إعادة العرض
        }
    }
}

// ===== إضافة مهمة جديدة =====
// دالة لإضافة مهمة جديدة إلى القائمة
function addTask() {
    const text = taskInput.value.trim();
    console.log('📝 محاولة إضافة مهمة:', text);

    // التحقق من أن النص غير فارغ
    if (text === '') {
        alert('⚠️ Please write a task first!');
        taskInput.focus();
        return;
    }

    // إنشاء كائن المهمة الجديدة
    const newTask = {
        id: Date.now(), // معرف فريد
        text: text,
        completed: false // غير مكتملة افتراضياً
    };

    // إضافة المهمة إلى المصفوفة
    tasks.push(newTask);
    taskInput.value = ''; // مسح حقل الإدخال
    taskInput.focus(); // التركيز على الحقل
    console.log('✅ تم إضافة المهمة:', newTask.text);
    renderTasks(); // إعادة العرض
}

// ===== تحديث الإحصائيات =====
// دالة لتحديث الأرقام في الواجهة
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    
    // تحديث العناصر في HTML
    taskCounter.textContent = total;
    totalTasksSpan.textContent = total;
    completedTasksSpan.textContent = completed;
    
    console.log(`📊 الإحصائيات: ${total} مهمة، ${completed} منجزة`);
}

// ===== مسح الكل =====
// دالة لحذف جميع المهام دفعة واحدة
function clearAll() {
    if (tasks.length === 0) {
        alert('No tasks to clear!');
        return;
    }
    if (confirm('⚠️ Are you sure you want to delete all tasks?')) {
        tasks = []; // تفريغ المصفوفة
        renderTasks(); // إعادة العرض
        console.log('🗑️ تم مسح جميع المهام');
    }
}

// ============================================================
// ربط الأحداث (Event Listeners)
// ============================================================

// عند الضغط على زر الإضافة
addBtn.addEventListener('click', function() {
    console.log('🖱️ تم الضغط على زر Add');
    addTask();
});

// عند الضغط على مفتاح Enter في حقل الإدخال
taskInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // منع السلوك الافتراضي
        console.log('⌨️ تم الضغط على Enter');
        addTask();
    }
});

// عند الضغط على زر مسح الكل
clearAllBtn.addEventListener('click', function() {
    console.log('🖱️ تم الضغط على زر Clear All');
    clearAll();
});

// ============================================================
// بدء التطبيق
// ============================================================

loadTasks(); // تحميل المهام عند بدء التشغيل
console.log('✅ التطبيق جاهز للاستخدام!');

// حفظ المهام تلقائياً عند إغلاق الصفحة
window.addEventListener('beforeunload', function() {
    saveTasks();
});