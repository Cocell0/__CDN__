print("Playground initiation.");
-- Function to check if a number is prime
function is_prime(num)
  if num <= 1 then
      return false
  end
  if num == 2 then
      return true
  end
  if num % 2 == 0 then
      return false
  end
  for i = 3, math.sqrt(num), 2 do
      if num % i == 0 then
          return false
      end
  end
  return true
end

-- Function to calculate prime numbers up to a given limit
function calculate_primes(limit)
  local primes = {}
  for i = 1, limit do
      if is_prime(i) then
          table.insert(primes, i)
      end
  end
  return primes
end

-- Function to run a time-consuming task
function perform_heavy_computation(iterations, prime_limit)
  for i = 1, iterations do
      -- Calculate primes up to prime_limit
      local primes = calculate_primes(prime_limit)
      -- Optional: Print progress to see the script is running (commented out to avoid slowing down the script further)
      -- print("Iteration: " .. i .. " - Number of primes found: " .. #primes)
  end
end

-- Main function to start the performance test
function main()
  local iterations = 10000       -- Number of iterations to run
  local prime_limit = 10000     -- Limit up to which primes are calculated

  -- Print start time
  print("Starting performance test...")

  -- Run the heavy computation task
  perform_heavy_computation(iterations, prime_limit)

  -- Print end time
  print("Performance test completed.")
end

-- Run the main function
main()
