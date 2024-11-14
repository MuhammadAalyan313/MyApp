<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set necessary headers for CORS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Ensure Content-Type is application/json
if (!isset($_SERVER['CONTENT_TYPE']) || stripos($_SERVER['CONTENT_TYPE'], 'application/json') === false) {
    http_response_code(400); // Bad Request
    echo json_encode(['error' => 'Content-Type must be application/json']);
    exit;
}

// Include the database connection file
include 'db.php';

$response = [];

try {
    // Get JSON input
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    if (!$data) {
        throw new Exception('Invalid JSON input');
    }

    if (!isset($data['email']) || !isset($data['password'])) {
        throw new Exception('Email or password not provided');
    }

    $email = $data['email'];
    $password = $data['password'];

    // Check if user already exists
    $sql = "SELECT email FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        throw new Exception('Database prepare statement failed: ' . $conn->error);
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $response['error'] = 'User already exists';
        http_response_code(409); // Conflict
    } else {
        // Hash the password before storing it in the database
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        $insertSql = "INSERT INTO users (email, password) VALUES (?, ?)";
        $insertStmt = $conn->prepare($insertSql);

        if (!$insertStmt) {
            throw new Exception('Database prepare statement failed: ' . $conn->error);
        }

        $insertStmt->bind_param("ss", $email, $hashedPassword);

        if ($insertStmt->execute()) {
            $response['success'] = true;
            $response['message'] = 'User created successfully';
            http_response_code(201); // Created
        } else {
            throw new Exception('Insert execute failed: ' . $insertStmt->error);
        }

        $insertStmt->close();
    }

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    error_log('Error in signup process: ' . $e->getMessage());
    $response['success'] = false;
    $response['error'] = $e->getMessage();
    http_response_code(500); // Internal Server Error
}

// Send the JSON response
echo json_encode($response);
?>
