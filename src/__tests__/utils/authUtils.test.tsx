import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../types/authTypes';
import { isTokenValid, getUserIdFromToken } from '../../utils/authUtils';

// Mock jwtDecode function
jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

describe('authUtils Testing', () => {
  //note: the structure for jwt authentication token -> Header.payload.signature (xxxx.yyyy.zzzz)
  describe('isTokenValid', () => {
    it('should return true if the token is valid and not expired', () => {
      const validToken =
        'header.' +
        btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })) +
        '.signature'; // 1 hour expiration
      expect(isTokenValid(validToken)).toBe(true);
    });

    it('should return false if the token is expired', () => {
      const expiredToken =
        'header.' +
        btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) - 3600 })) +
        '.signature'; // Expired 1 hour ago
      expect(isTokenValid(expiredToken)).toBe(false);
    });

    it('should return false if the token is invalid', () => {
      const invalidToken = '999999999-9-09-8i-'; //dummy token
      expect(isTokenValid(invalidToken)).toBe(false);
    });

    it('should handle JSON parsing errors gracefully and return false', () => {
      const invalidJsonToken = 'header.9999999.signature';
      expect(isTokenValid(invalidJsonToken)).toBe(false);
    });
  });

  describe('getUserIdFromToken', () => {
    it('should return the user ID if the token is valid and contains userId', () => {
      const mockUserId = 123;
      const mockDecodedToken: JwtPayload = {
        userId: mockUserId.toString(),
        exp: 0,
      };
      (jwtDecode as jest.Mock).mockReturnValue(mockDecodedToken);

      const token = 'valid.token.string';
      expect(getUserIdFromToken(token)).toBe(mockUserId);
      expect(jwtDecode).toHaveBeenCalledWith(token);
    });

    it('should return -1 if the token does not contain userId', () => {
      const mockDecodedToken: JwtPayload = {
        userId: '', // No userId in payload
        exp: 0,
      };
      (jwtDecode as jest.Mock).mockReturnValue(mockDecodedToken);

      const token = 'valid.token.string';
      expect(getUserIdFromToken(token)).toBe(-1);
      expect(jwtDecode).toHaveBeenCalledWith(token);
    });

    it('should return -1 if the token is invalid, malformed or cannot be decoded', () => {
      (jwtDecode as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });
      const token = '.token.';
      expect(getUserIdFromToken(token)).toBe(-1);
      expect(jwtDecode).toHaveBeenCalledWith(token);
    });
  });
});
