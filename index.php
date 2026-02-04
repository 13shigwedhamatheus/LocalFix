<?php include 'db.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>LocalFix | Job Board</title>
    <link rel="icon" href="mylogo.PNG">
    <style>
        body { font-family: sans-serif;min-height: 100vh; background:linear-gradient(to top,rgba(0,0,0,0.5) 25%,rgba(0,0,0,0.5) 25%), url("remote-tasks-office-essentials.jpg");background-position: center;background-size: cover;background-repeat: no-repeat; padding: 20px; }
        .container { max-width: 900px; margin: auto; }
        .form-box { background: hsl(0, 0%, 65%); padding: 20px; border-radius: 8px; margin-bottom: 30px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
        .card { background: hsl(0,0%,50%); padding: 15px; border-radius: 8px; border-left: 5px solid #007bff; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .price { color: #28a745; font-weight: bold; }
        input, textarea, select { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;}
        button { background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; }
        button:hover { background: #0056b3; }
    </style>
</head>
<body>

<div class="container">
    <h1>📍 LocalFix Board</h1>

    <div class="form-box">
        <h3>Post a New Request</h3>
        <form action="index.php" method="POST">
            <input type="text" name="title" placeholder="What do you need help with?" required>
            <textarea name="description" placeholder="Describe the details..." required></textarea>
            <input type="number" name="budget" placeholder="Budget ($)" required>
            <input type="text" name="contact" placeholder="Your Email or Phone" required>
            <button type="submit" name="submit_task">Post Task</button>
        </form>
    </div>
    <p>Wish to head back to the main page? <a href="index.html" title="Head Back To Main Paige">Click here</a></p>

    <?php
    // LOGIC TO SAVE DATA
    if(isset($_POST['submit_task'])) {
        $title = $conn->real_escape_string($_POST['title']);
        $desc = $conn->real_escape_string($_POST['description']);
        $budget = $_POST['budget'];
        $contact = $conn->real_escape_string($_POST['contact']);

        $sql = "INSERT INTO tasks (title, description, budget, contact) VALUES ('$title', '$desc', '$budget', '$contact')";
        if($conn->query($sql)) {
            echo "<p style='color:green;'>Task posted successfully!</p>";
        }
    }
    ?>

    <h2>Recent Requests</h2>
    <div class="grid">
        <?php
        $result = $conn->query("SELECT * FROM tasks ORDER BY created_at DESC");
        if($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<div class='card'>
                        <h3>".htmlspecialchars($row['title'])."</h3>
                        <p>".htmlspecialchars($row['description'])."</p>
                        <p class='price'>Budget: $".htmlspecialchars($row['budget'])."</p>
                        <small>Contact: ".htmlspecialchars($row['contact'])."</small>
                      </div>";
                      // Inside your while loop in index.php
                echo "<div class='card'>
                        <h3>".htmlspecialchars($row['title'])."</h3>
                        <p>".htmlspecialchars($row['description'])."</p>
                        <p class='price'>Budget: $".htmlspecialchars($row['budget'])."</p>
                        <a href='generate_pdf.php?id=".$row['id']."' target='_blank'>
                            <button style='background: #28a745;'>Download PDF Quote</button>
                        </a>
                    </div>";
            }
        } else {
            echo "<p>No tasks posted yet. Be the first!</p>";
        }
        ?>
    </div>
</div>

<script>
    // Simple JS to log when a user submits (Client-side interaction)
    document.querySelector('form').onsubmit = function() {
        console.log("Submitting new task...");
    };
</script>

</body>
</html>