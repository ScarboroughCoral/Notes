impl Solution {
    pub fn solve_n_queens(n: i32) -> Vec<Vec<String>> {
        let mut result = vec![];
        let size = n as usize;
        fn backtrace(mut track: &mut Vec<Vec<char>>, row: usize, mut result: &mut Vec<Vec<String>>, size: usize) {
            if row >= size {
                result.push(track.into_iter().map(|chars| chars.iter().collect()).collect());
                return;
            }
            for i in 0..size {
                if !Solution::is_valid(&track, row, i, size) {
                    continue;
                }
                track[row][i] = 'Q';
                backtrace(&mut track, row + 1, &mut result, size);
                track[row][i] = '.';
            }
        }
        let mut track = vec![vec!['.'; size]; size];
        backtrace(&mut track, 0, &mut result, size);
        return result;
    }

    fn is_valid(borad: &Vec<Vec<char>>, row: usize, col: usize, size: usize) -> bool {
        for i in 0..row {
            if borad[i][col] == 'Q' {
                return false;
            }
        }
        for j in 0..col {
            if borad[row][j] == 'Q' {
                return false;
            }
        }
        let (mut i, mut j) = (row - 1, col - 1);
        while i as isize >= 0 && j as isize >= 0 {
            if borad[i][j] == 'Q' {
                return false;
            }
            i -= 1;
            j -= 1;
        }
        let (mut i, mut j) = (row - 1, col + 1);
        while i as isize >= 0 && j < size {
            if borad[i][j] == 'Q' {
                return false;
            }
            i -= 1;
            j += 1;
        }
        return true;
    }
}
