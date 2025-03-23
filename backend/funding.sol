// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Crowdfunding
 * @dev A contract for funding projects with ETH
 */
contract Crowdfunding {
    // Project owner
    address public owner;
    
    // Project details
    string public projectName;
    string public projectDescription;
    uint256 public fundingGoal;
    uint256 public deadline;
    
    // Funding state
    uint256 public totalFunds;
    bool public fundingGoalReached;
    bool public projectClosed;
    
    // Mapping to track contributions by address
    mapping(address => uint256) public contributions;
    
    // List of contributors
    address[] public contributors;
    
    // Events
    event FundingReceived(address contributor, uint256 amount, uint256 totalFunds);
    event ProjectFunded(uint256 totalFunds);
    event FundsWithdrawn(uint256 amount);
    event RefundIssued(address contributor, uint256 amount);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the project owner can call this function");
        _;
    }
    
    modifier projectActive() {
        require(block.timestamp < deadline, "Funding period has ended");
        require(!projectClosed, "Project has been closed");
        _;
    }
    
    modifier projectEnded() {
        require(block.timestamp >= deadline, "Funding period has not ended yet");
        require(!projectClosed, "Project has been closed");
        _;
    }
    
    /**
     * @dev Constructor - Sets up the crowdfunding project
     * @param _name Name of the project
     * @param _description Description of the project
     * @param _fundingGoalInWei Funding goal in Wei
     * @param _durationInDays Duration of the funding period in days
     */
    constructor(
        string memory _name,
        string memory _description,
        uint256 _fundingGoalInWei,
        uint256 _durationInDays
    ) {
        owner = msg.sender;
        projectName = _name;
        projectDescription = _description;
        fundingGoal = _fundingGoalInWei;
        deadline = block.timestamp + (_durationInDays * 1 days);
        
        totalFunds = 0;
        fundingGoalReached = false;
        projectClosed = false;
    }
    
    /**
     * @dev Function to fund the project
     */
    function contribute() external payable projectActive {
        require(msg.value > 0, "Contribution amount must be greater than 0");
        
        // First-time contributor
        if (contributions[msg.sender] == 0) {
            contributors.push(msg.sender);
        }
        
        // Add contribution
        contributions[msg.sender] += msg.value;
        totalFunds += msg.value;
        
        // Check if funding goal has been reached
        if (totalFunds >= fundingGoal && !fundingGoalReached) {
            fundingGoalReached = true;
            emit ProjectFunded(totalFunds);
        }
        
        emit FundingReceived(msg.sender, msg.value, totalFunds);
    }
    
    /**
     * @dev Function for the owner to withdraw funds if goal was reached
     */
    function withdrawFunds() external onlyOwner projectEnded {
        require(fundingGoalReached, "Funding goal was not reached");
        require(totalFunds > 0, "No funds to withdraw");
        
        uint256 amountToWithdraw = totalFunds;
        totalFunds = 0;
        projectClosed = true;
        
        // Transfer funds to the owner
        (bool success, ) = payable(owner).call{value: amountToWithdraw}("");
        require(success, "Transfer failed");
        
        emit FundsWithdrawn(amountToWithdraw);
    }
    
    /**
     * @dev Function for contributors to claim refunds if goal was not reached
     */
    function claimRefund() external projectEnded {
        require(!fundingGoalReached, "Funding goal was reached, no refunds available");
        require(contributions[msg.sender] > 0, "No contributions to refund");
        
        uint256 refundAmount = contributions[msg.sender];
        contributions[msg.sender] = 0;
        
        // Send refund
        (bool success, ) = payable(msg.sender).call{value: refundAmount}("");
        require(success, "Refund failed");
        
        emit RefundIssued(msg.sender, refundAmount);
    }
    
    /**
     * @dev Function to cancel the project (only owner, only before deadline)
     */
    function cancelProject() external onlyOwner projectActive {
        projectClosed = true;
    }
    
    /**
     * @dev Function to get number of contributors
     */
    function getContributorsCount() external view returns (uint256) {
        return contributors.length;
    }
    
    /**
     * @dev Function to check remaining time in seconds
     */
    function getRemainingTime() external view returns (uint256) {
        if (block.timestamp >= deadline) {
            return 0;
        }
        return deadline - block.timestamp;
    }
    
    /**
     * @dev Function to get project status information
     */
    function getProjectStatus() external view returns (
        string memory name,
        string memory description,
        uint256 goal,
        uint256 currentAmount,
        uint256 remainingTime,
        bool isGoalReached,
        bool isClosed
    ) {
        uint256 _remainingTime = 0;
        if (block.timestamp < deadline) {
            _remainingTime = deadline - block.timestamp;
        }
        
        return (
            projectName,
            projectDescription,
            fundingGoal,
            totalFunds,
            _remainingTime,
            fundingGoalReached,
            projectClosed
        );
    }
    
    /**
     * @dev Function to handle refunds when project is canceled
     */
    function getRefundAfterCancel() external {
        require(projectClosed, "Project is not closed");
        require(!fundingGoalReached, "Funding goal was reached, no refunds available");
        require(contributions[msg.sender] > 0, "No contributions to refund");
        
        uint256 refundAmount = contributions[msg.sender];
        contributions[msg.sender] = 0;
        
        // Send refund
        (bool success, ) = payable(msg.sender).call{value: refundAmount}("");
        require(success, "Refund failed");
        
        emit RefundIssued(msg.sender, refundAmount);
    }
}