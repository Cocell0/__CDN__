import math
import time

# Function to check if a number is prime
def is_prime(num):
    if num <= 1:
        return False
    if num == 2:
        return True
    if num % 2 == 0:
        return False
    for i in range(3, int(math.sqrt(num)) + 1, 2):
        if num % i == 0:
            return False
    return True

# Function to calculate prime numbers up to a given limit
def calculate_primes(limit):
    primes = []
    for i in range(1, limit + 1):
        if is_prime(i):
            primes.append(i)
    return primes

# Function to run a time-consuming task
def perform_heavy_computation(iterations, prime_limit):
    for i in range(iterations):
        # Calculate primes up to prime_limit
        primes = calculate_primes(prime_limit)
        # Optional: Print progress to see the script is running (commented out to avoid slowing down the script further)
        # print(f"Iteration: {i + 1} - Number of primes found: {len(primes)}")

# Main function to start the performance test
def main():
    iterations = 10000       # Number of iterations to run
    prime_limit = 10000      # Limit up to which primes are calculated

    # Print start time
    print("Starting performance test...")

    # Record the start time
    start_time = time.time()

    # Run the heavy computation task
    perform_heavy_computation(iterations, prime_limit)

    # Record the end time
    end_time = time.time()

    # Print end time and duration
    print("Performance test completed.")
    print(f"Duration: {end_time - start_time:.2f} seconds")

# Run the main function
if __name__ == "__main__":
    main()
